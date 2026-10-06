import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFrame, ContactCTA, QuestionList } from "../content-ui";

const title = "Проектирование бетонных лестниц в Беларуси";
const description = "Индивидуальное проектирование монолитной лестницы: проём, чистовые уровни, форма марша, опирание и подготовка под отделку. Работаем по всей Беларуси.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/proektirovanie-betonnyh-lestnic" }, openGraph: { title, description, url: "/proektirovanie-betonnyh-lestnic", images: [{ url: "/images/photos/9k_titiva_2.webp", alt: "Индивидуальная радиусная бетонная лестница на тетивах" }] } };

export default function DesignPage() {
  return <PageFrame title="Проектирование лестниц" path="/proektirovanie-betonnyh-lestnic">
    <section className="design-hero wrap"><div className="content-hero">
      <p className="eyebrow">ПОД ВАШ ДОМ / ПО ВСЕЙ БЕЛАРУСИ</p><h1>Проектирование бетонных лестниц.</h1>
      <p className="content-lead">Проектируем бетонные лестницы по всей Беларуси: связываем форму марша с планировкой, высотой этажей и будущей отделкой. Обратиться можно на этапе проекта дома или с уже готовым проёмом.</p>
      <div className="content-actions"><Link className="button dark" href="/#estimate">Обсудить мой проём <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/stoimost-betonnyh-lestnic">Посмотреть стоимость →</Link></div>
    </div><div className="design-hero-photo"><Image src="/images/photos/9k_titiva_2.webp" alt="Радиусная монолитная лестница на тетивах, спроектированная под частный дом" fill priority sizes="(max-width: 850px) 100vw, 45vw" /><span>ИНДИВИДУАЛЬНАЯ ГЕОМЕТРИЯ</span></div></section>
    <section className="section design-process"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">ЧЕТЫРЕ ОСНОВЫ ПРОЕКТА</p><h2>Продумываем каждый подъём.</h2></div><p className="section-intro">Красивый силуэт начинается с размеров, удобной линии движения и понятной схемы опирания.</p></div>
      <div className="info-grid">{[
        ["Проём и уровни", "Сопоставляем размеры проёма с высотой между чистовыми полами, толщиной перекрытий и положением дверей и окон."],
        ["Форма и движение", "Выбираем прямой марш, поворот с площадкой или забежными ступенями, винтовую или радиусную конструкцию. Проверяем проход под перекрытием."],
        ["Опоры и конструктив", "Уточняем точки опирания и несущие элементы дома. Монокосоур, тетивы и открытые ступени требуют индивидуальной проверки узлов."],
        ["Отделка и ограждение", "Учитываем толщину облицовки ступеней и полов, будущие крепления ограждений. Это помогает избежать разных по высоте первого и последнего подъёмов."],
      ].map(([heading, text], i) => <article className="info-card" key={heading}><span className="info-number">0{i + 1}</span><h3>{heading}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="section wrap editorial-columns"><div><p className="eyebrow">ДАННЫЕ ДЛЯ НАЧАЛА</p><h2>План или фото.<br />Начнём с них.</h2><p className="content-lead">Необязательно заранее выбирать конструкцию. Покажите пространство — обсудим подходящие решения.</p></div><div className="editorial-body"><ol className="numbered-list"><li><strong>План и размеры проёма</strong><p>Длина, ширина и расположение проёма относительно стен, окон и дверей.</p></li><li><strong>Высота между этажами</strong><p>Уровни чистовых полов или черновые отметки с предполагаемой толщиной покрытий.</p></li><li><strong>Фото и состояние дома</strong><p>Проём снизу и сверху, перекрытия, стены и доступ к месту строительства.</p></li><li><strong>Пожелания и адрес объекта</strong><p>Форма, отделка, ограждение и населённый пункт для обсуждения выезда.</p></li></ol></div></section>
    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">ВЫБИРАЕМ СХЕМУ</p><h2>Разные формы.<br />Один подход.</h2></div></div><div className="service-link-grid">{[
      ["p-obraznye-betonnye-lestnitsy", "С площадкой", "Поворот и место для смены направления между маршами."],
      ["radiusnye-betonnye-lestnitsy", "Радиусная", "Плавный поворот, рассчитанный под пространство дома."],
      ["konsolnye-betonnye-lestnitsy", "На монокосоуре", "Открытые ступени и выразительная несущая балка."],
      ["lestnitsy-s-obratnymi-stupenyami", "С обратными ступенями", "Ступенчатый нижний профиль монолитного марша."],
    ].map(([slug, heading, text]) => <Link className="service-link" href={`/works/${slug}`} key={slug}><h3>{heading} <span aria-hidden="true">↗</span></h3><p>{text}</p></Link>)}</div></section>
    <section className="section wrap editorial-faq"><div><p className="eyebrow">ВОПРОСЫ ДО СТРОИТЕЛЬСТВА</p><h2>Лучше заранее.</h2></div><QuestionList items={[
      ["Когда обсуждать лестницу?", "Лучше до устройства перекрытий: размеры проёма и точки опирания можно согласовать с проектом дома. Если проём уже готов, подберём варианты с учётом существующих ограничений."],
      ["Можно ли вписать лестницу в маленький проём?", "Возможность зависит от высоты этажа, формы проёма и свободного прохода. Проверим поворотную или винтовую схему; компактность не должна достигаться за счёт неудобного подъёма."],
      ["Почему нужно знать толщину отделки?", "Покрытия этажей и ступеней меняют чистовую высоту подъёмов. Если учесть их только после бетонирования, первая или последняя ступень может отличаться от остальных."],
      ["Как узнать стоимость проектирования и строительства?", "Пришлите исходные данные и пожелания. Состав проекта, сроки и стоимость обсуждаем под конкретную задачу. Ориентиры изготовления бетонной конструкции приведены на странице стоимости."],
    ]} /></section><ContactCTA title="Обсудим лестницу до заливки." />
  </PageFrame>;
}
