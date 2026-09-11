import Image from "next/image";
import { site, faq } from "./site";
import { Header, Gallery, LeadForm, Tracking } from "./ui";
const variants = [
  [
    "01",
    "Прямая",
    "Лаконичный марш для помещений с достаточной длиной проёма.",
    "Один марш",
  ],
  [
    "02",
    "Г-образная",
    "Поворот на 90° с площадкой или забежными ступенями.",
    "Поворот 90°",
  ],
  [
    "03",
    "П-образная",
    "Два марша с разворотом для продуманного использования пространства.",
    "Поворот 180°",
  ],
  [
    "04",
    "Винтовая",
    "Выразительная форма для индивидуальных планировок.",
    "Плавная геометрия",
  ],
];
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        description:
          "Проектирование и изготовление бетонных лестниц в Беларуси. Более 16 лет опыта и более 300 изготовленных лестниц.",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phone,
            contactType: "sales",
            availableLanguage: "Russian",
            areaServed: "BY",
          },
          {
            "@type": "ContactPoint",
            telephone: site.secondPhone,
            contactType: "sales",
            areaServed: "BY",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Изготовление бетонных лестниц на заказ",
        serviceType: "Бетонные лестницы",
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Беларусь" },
        url: site.url,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };
  return (
    <>
      <a className="skip" href="#main">
        Перейти к содержимому
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Tracking />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="mini-line" /> ПРОЕКТИРУЕМ И ИЗГОТАВЛИВАЕМ ·
              БЕЛАРУСЬ
            </div>
            <h1 id="hero-title">
              Бетонные
              <br />
              лестницы.
              <br />
              <span>Под ваш дом.</span>
            </h1>
            <p className="hero-description">
              От первого эскиза до готовых ступеней.
              <br className="desktop-break" /> На второй этаж и для входного
              крыльца —<br className="desktop-break" /> с отделкой или без неё.
            </p>
            <div className="hero-actions">
              <a className="button lime" href="#estimate">
                Обсудить стоимость <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#projects">
                Посмотреть лестницы <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-note">
              <span className="check" aria-hidden="true">
                ✓
              </span>{" "}
              Индивидуальная геометрия. Единая команда.
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/images/photos/photo_2026-09-11_13-45-33.webp"
              alt="Изготовленная на заказ монолитная винтовая бетонная лестница в частном доме"
              fill
              priority
              sizes="(max-width: 850px) 100vw, 52vw"
            />
            <div className="image-label">
              <span>БЕТОН. ФОРМА. ХАРАКТЕР.</span>
              <span>01 / 04</span>
            </div>
            <a
              className="visual-link"
              href="#types"
              aria-label="Посмотреть варианты конструкций"
            >
              ↗
            </a>
          </div>
        </section>
        <div className="benefit-strip wrap">
          <div>
            <span>16+</span>
            <p>
              Более 16 лет
              <br />
              <strong>изготавливаем лестницы</strong>
            </p>
          </div>
          <div>
            <span>300+</span>
            <p>
              Более 300 лестниц
              <br />
              <strong>уже изготовлено</strong>
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              От проекта
              <br />
              <strong>до реализации</strong>
            </p>
          </div>
          <div>
            <span>04</span>
            <p>
              Работаем
              <br />
              <strong>по всей Беларуси</strong>
            </p>
          </div>
        </div>
        <section id="types" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / КОНСТРУКЦИИ</p>
              <h2>
                Хорошая лестница
                <br />
                начинается с планировки.
              </h2>
            </div>
            <p className="section-intro">
              Подберём форму под размеры проёма, высоту этажа и ваш сценарий
              жизни. Чтобы подъём был удобным, а пространство — продуманным.
            </p>
          </div>
          <div className="types-grid">
            {variants.map(([n, title, text, tag]) => (
              <article className="type-card" key={n}>
                <div className="type-top">
                  <span>{n}</span>
                  <span className="small-tag">{tag}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#estimate" className="card-link">
                  Обсудить вариант <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <div className="type-note">
            <strong>Не знаете, что подойдёт?</strong>
            <span>Начнём с плана или фотографии проёма.</span>
            <a href="#estimate">Помогите выбрать ↗</a>
          </div>
        </section>
        <section id="projects" className="section projects">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / ГЕОМЕТРИЯ В ДЕТАЛЯХ</p>
                <h2>
                  Реальные работы.
                  <br />
                  Разная геометрия.
                </h2>
              </div>
              <p className="section-intro">
                Собрали изготовленные лестницы по типам конструкций. Откройте
                проект, чтобы рассмотреть детали, варианты отделки и ограждений.
              </p>
            </div>
            <Gallery />
          </div>
        </section>
        <section id="finish" className="section wrap finish">
          <div>
            <p className="eyebrow">03 / ОТДЕЛКА И ОГРАЖДЕНИЯ</p>
            <h2>
              От монолита
              <br />
              до части интерьера.
            </h2>
            <p className="section-intro">
              Закажите бетонную основу или обсудите лестницу под ключ. Облицовку
              и ограждение подберём в одном проекте.
            </p>
            <a href="#estimate" className="button dark">
              Подобрать комплектацию <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="finish-list">
            {[
              ["Дерево", "Тёплая фактура и естественный рисунок."],
              ["Плитка", "Разнообразие форматов, оттенков и поверхностей."],
              ["Камень", "Выразительная фактура для акцентной лестницы."],
            ].map(([title, text], i) => (
              <div className="finish-row" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
            <p className="railing">
              Ограждения: дерево · ковка · стекло · нержавеющая сталь
            </p>
          </div>
        </section>
        <section id="process" className="section process">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">04 / КАК МЫ РАБОТАЕМ</p>
                <h2>
                  Один проект.
                  <br />
                  Понятный путь к результату.
                </h2>
              </div>
              <p className="section-intro">
                Отталкиваемся от вашего дома и пожеланий. Конструкцию, состав
                работ и сроки обсуждаем до начала изготовления.
              </p>
            </div>
            <ol className="steps">
              {[
                [
                  "Знакомимся с задачей",
                  "Уточняем планировку, размеры проёма, место строительства и пожелания.",
                ],
                [
                  "Согласуем решение",
                  "Обсуждаем замер, геометрию, материалы и индивидуальную смету.",
                ],
                [
                  "Изготавливаем основу",
                  "Выполняем опалубку, армирование и бетонирование по согласованному проекту.",
                ],
                [
                  "Завершаем лестницу",
                  "После набора прочности переходим к согласованной отделке и ограждениям.",
                ],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="estimate" className="section wrap estimate">
          <div className="estimate-copy">
            <p className="eyebrow">05 / ИНДИВИДУАЛЬНЫЙ РАСЧЁТ</p>
            <h2>
              Сколько стоит
              <br />
              <span>ваша лестница?</span>
            </h2>
            <p>
              Каждый дом разный. Поэтому стоимость бетонной лестницы
              рассчитываем по размерам, конструкции и комплектации.
            </p>
            <ul className="cost-list">
              <li>Форма и высота лестницы</li>
              <li>Размеры проёма и условия монтажа</li>
              <li>Отделка и материал ограждений</li>
            </ul>
          </div>
          <LeadForm />
        </section>
        <section id="faq" className="section wrap faq">
          <div>
            <p className="eyebrow">06 / ВОПРОСЫ И ОТВЕТЫ</p>
            <h2>
              До первого
              <br />
              шага.
            </h2>
            <p className="section-intro">
              Что стоит знать перед заказом бетонной лестницы.
            </p>
          </div>
          <div>
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contacts" className="contact-section">
          <div className="wrap">
            <p className="eyebrow">ОБСУДИМ ВАШ ПРОЕКТ</p>
            <div className="contact-grid">
              <h2>
                Ваш дом.
                <br />
                Ваша лестница.
                <br />
                <span>Начнём с разговора.</span>
              </h2>
              <div className="contact-details">
                <a href={`tel:${site.phone}`} data-track="phone_click">
                  {site.phoneDisplay}
                </a>
                <a href={`tel:${site.secondPhone}`} data-track="phone_click">
                  {site.secondPhoneDisplay}
                </a>
                <a
                  className="email"
                  href={`mailto:${site.email}`}
                  data-track="email_click"
                >
                  {site.email} ↗
                </a>
                <p>
                  Проектирование и изготовление
                  <br />
                  лестниц по всей Беларуси.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="brand" href="/" aria-label="Бетонные лестницы — на главную">
          БЕТОННЫЕ ЛЕСТНИЦЫ<span>ПРОЕКТИРОВАНИЕ И ИЗГОТОВЛЕНИЕ</span>
        </a>
        <p>© {new Date().getFullYear()} Бетонные лестницы</p>
        <a href="#estimate">Запросить расчёт ↗</a>
      </footer>
      <div className="mobile-cta">
        <a href={`tel:${site.phone}`} data-track="phone_click">
          Позвонить
        </a>
        <a href="#estimate">Узнать стоимость ↗</a>
      </div>
    </>
  );
}
