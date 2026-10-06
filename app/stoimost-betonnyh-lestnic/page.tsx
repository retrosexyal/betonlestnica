import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, ContactCTA, PriceNote, QuestionList } from "../content-ui";
import { WorkPhotoGallery } from "../ui";
import { priceExamples, formatPrice } from "../pricing";
import { getWork } from "../works";

const title = "Стоимость бетонных лестниц в Беларуси";
const description = "Бетонные лестницы под ключ от 5 000 BYN: материалы, доставка и работы включены. Восемь вариантов с фото, цены на монокосоур, обратные и радиусные ступени. Без отделки.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/stoimost-betonnyh-lestnic" },
  openGraph: { title, description, url: "/stoimost-betonnyh-lestnic", images: [{ url: priceExamples[0].images[0].src, alt: priceExamples[0].images[0].alt }] },
};

export default function PricesPage() {
  return <PageFrame title="Стоимость лестниц" path="/stoimost-betonnyh-lestnic">
    <section className="content-hero wrap">
      <p className="eyebrow">СТОИМОСТЬ / БЕТОН ПОД КЛЮЧ</p>
      <h1>Бетонные лестницы.<br />Цены под ваш проект.</h1>
      <p className="content-lead">Сколько стоит бетонная лестница в Беларуси? Показываем восемь решений с фотографиями и ориентирами стоимости — от прямых площадок до сложных радиусных конструкций.</p>
      <div className="content-actions"><Link className="button dark" href="/#estimate">Рассчитать мою лестницу <span aria-hidden="true">↗</span></Link><a className="text-link" href="#examples">Смотреть цены ↓</a></div>
      <div className="price-context"><span>01 / Белорусские рубли</span><span>02 / Бетонная конструкция</span><span>03 / Без отделки</span></div>
      <PriceNote />
    </section>
    <section id="examples" className="section price-catalog"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">ВОСЕМЬ ВАРИАНТОВ</p><h2>Форма. Фото. Стоимость.</h2></div><p className="section-intro">Сравните конструкцию и нижний профиль марша. Нажмите на фотографию, чтобы рассмотреть детали.</p></div>
      <div className="price-catalog-grid">{priceExamples.map((example, i) => <article className="price-example" id={example.id} key={example.id}>
        <div className="price-example-top"><span>{String(i + 1).padStart(2, "0")}</span><span>{example.from ? "НАЧАЛЬНАЯ СТОИМОСТЬ" : "ЦЕНА ПРИМЕРА"}</span></div>
        <div className="price-example-photos"><WorkPhotoGallery images={example.images} /></div>
        <div className="price-example-copy"><h3>{example.title}</h3><p className="price-amount">{formatPrice(example)}</p><p className="price-finish">Под ключ без отделки</p><p className="price-description">{example.description}</p>
          <div className="price-example-links"><Link className="card-link" href="/#estimate">Рассчитать похожую <span aria-hidden="true">↗</span></Link><Link className="subtle-link" href={`/works/${example.workSlugs[0]}`}>{getWork(example.workSlugs[0])?.shortTitle} →</Link></div>
        </div>
      </article>)}</div>
      <PriceNote />
    </div></section>
    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">СМЕТА ПОД ВАШ ОБЪЕКТ</p><h2>Что меняет цену?</h2></div><p className="section-intro">Две внешне похожие лестницы могут требовать разного объёма бетона, опалубки и работы на объекте.</p></div>
      <div className="info-grid">{[
        ["Размеры и поворот", "Высота между этажами, ширина марша, число ступеней и площадок. Радиусная форма требует отдельной проработки геометрии."],
        ["Несущая конструкция", "Гладкий или обратный низ, монокосоур, тетивы, борт и стела. Узлы опирания выбираются под условия конкретного дома."],
        ["Условия на объекте", "Готовность перекрытий, доступ к месту работ и населённый пункт. Условия подачи материалов уточняем до согласования сметы."],
        ["Отделка и ограждения", "Дерево, плитка, камень и перила рассчитываются отдельно. Толщину будущей облицовки учитываем уже при проектировании основы."],
      ].map(([heading, text], i) => <article className="info-card" key={heading}><span className="info-number">0{i + 1}</span><h3>{heading}</h3><p>{text}</p></article>)}</div>
      <div className="related-strip"><p>Планируете лестницу до строительства перекрытий?</p><Link href="/proektirovanie-betonnyh-lestnic">Проектирование бетонных лестниц ↗</Link></div>
    </section>
    <section className="section wrap editorial-faq"><div><p className="eyebrow">О ЦЕНЕ И КОМПЛЕКТАЦИИ</p><h2>До расчёта.</h2></div><QuestionList items={[
      ["Это стоимость лестницы с отделкой?", "Нет. Указанные суммы относятся к бетонной конструкции под ключ без отделки. Облицовку и ограждения обсуждаем и рассчитываем отдельно."],
      ["Что входит в указанную цену?", "Материалы, доставка и все работы по бетонной конструкции под ключ. Отделка и ограждения в эти суммы не входят и рассчитываются отдельно."],
      ["Почему цены указаны «от»?", "Это начальная стоимость соответствующей конструкции. Размеры, конфигурация и условия на объекте могут отличаться от показанных примеров, поэтому окончательную смету согласуем для вашей лестницы."],
      ["Можно рассчитать лестницу по плану дома?", "Да. Пришлите план, размеры проёма, высоту между этажами и населённый пункт. Если чистовые уровни или отделка ещё не выбраны, укажите это в запросе."],
      ["Что нужно уточнить в смете?", "Состав работ и материалов, условия доставки и подачи бетона, подготовку объекта, а также отделку и ограждения. Согласуем комплектацию до начала работ."],
    ]} /></section>
    <ContactCTA />
  </PageFrame>;
}
