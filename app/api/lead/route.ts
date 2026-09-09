import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
 const fail=(error:string,status:number)=>NextResponse.json({error},{status});
 const origin=request.headers.get('origin');
 if(!origin || ![request.nextUrl.origin,process.env.NEXT_PUBLIC_SITE_URL].includes(origin))return fail('Недопустимый источник запроса.',403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return fail('Ожидается JSON.',415);
 if(Number(request.headers.get('content-length')||0)>12000)return fail('Запрос слишком большой.',413);
 // Cap the streamed body as well as Content-Length (which can be absent).
 let raw='';const reader=request.body?.getReader();if(!reader)return fail('Пустой запрос.',400);
 let size=0;const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>12000){await reader.cancel();return fail('Запрос слишком большой.',413);}raw+=decoder.decode(value,{stream:true});}raw+=decoder.decode();
 let data;try{data=JSON.parse(raw);}catch{return fail('Некорректные данные.',400);}
 if(!data||typeof data!=='object'||Array.isArray(data))return fail('Некорректные данные.',400);
 if(data.website)return fail('Не удалось отправить запрос.',400);
 if(typeof data.phone!=='string'||!/^[+\d\s()\-]{7,25}$/.test(data.phone)||data.phone.replace(/\D/g,'').length<7||data.consent!==true)return fail('Проверьте телефон и согласие на обратную связь.',400);
 for(const [key,max] of [['name',80],['city',100],['comment',1500]] as const){if(typeof data[key]!=='string'||data[key].length>max)return fail('Проверьте поля формы.',400);}
 if(!['Прямая','Г-образная','П-образная','Винтовая','Нужна помощь'].includes(data.kind)||!['Пока не знаю','Без отделки','Дерево','Плитка','Камень'].includes(data.finish))return fail('Проверьте параметры лестницы.',400);
 const endpoint=process.env.LEAD_WEBHOOK_URL;if(!endpoint)return fail('Отправка временно недоступна. Свяжитесь с нами по телефону или почте.',503);
 if(!endpoint.startsWith('https://'))return fail('Отправка временно недоступна.',503);
 const attribution:Record<string,string>={};for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','yclid']){if(typeof data.attribution?.[key]==='string')attribution[key]=data.attribution[key].slice(0,200);}
 try {const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.LEAD_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({name:data.name,phone:data.phone,city:data.city,comment:data.comment,kind:data.kind,finish:data.finish,consent:true,attribution,source:'vesspektr-landing',createdAt:new Date().toISOString()}),signal:AbortSignal.timeout(10000),redirect:'error'});if(!response.ok)return fail('Не удалось подтвердить доставку. Свяжитесь с нами напрямую.',502);return NextResponse.json({ok:true});}catch{return fail('Не удалось подтвердить доставку. Свяжитесь с нами напрямую.',502);}
}
