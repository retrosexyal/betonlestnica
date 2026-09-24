import type { Metadata } from "next";
import { Header, Tracking } from "../ui";
import { Footer } from "../footer";
import { CookieSettingsButton } from "../cookie-consent";
import { site } from "../site";

export const metadata: Metadata = {
  title: { absolute: "Политика обработки файлов cookie | Бетонные лестницы" },
  description:
    "Информация об использовании необходимых и аналитических файлов cookie на сайте “Бетонные лестницы”.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <>
      <a className="skip" href="#main">Перейти к содержимому</a>
      <Tracking />
      <Header />
      <main id="main" className="policy-page">
        <div className="wrap policy-layout">
          <header className="policy-heading">
            <p className="eyebrow">ПРАВОВАЯ ИНФОРМАЦИЯ</p>
            <h1>Политика обработки файлов cookie</h1>
            <p>
              Сайт «Бетонные лестницы» использует файлы cookie и похожие
              технологии браузера, необходимые для работы сайта, а с вашего
              согласия — также для аналитики посещаемости.
            </p>
          </header>

          <article className="policy-content">
            <section>
              <h2><span>01</span> Что такое cookie</h2>
              <p>
                Cookie — это небольшие фрагменты данных, которые сайт сохраняет
                в браузере. К похожим технологиям относится, например, локальное
                хранилище браузера. Они помогают сайту запоминать настройки и,
                если вы разрешили аналитику, получать техническую информацию о
                посещениях.
              </p>
            </section>

            <section>
              <h2><span>02</span> Какие cookie мы используем</h2>
              <h3>Необходимые cookie</h3>
              <p>
                Используются для основных функций сайта и сохранения вашего
                выбора о cookie. Сайт хранит настройку <code>cookie_consent</code>,
                в которой записаны версия согласия, разрешение или запрет
                аналитики и время обновления выбора.
              </p>
              <h3>Аналитические cookie</h3>
              <p>
                Только после вашего согласия сайт может подключить Google
                Analytics 4 и Яндекс Метрику. Эти сервисы помогают оценивать
                посещаемость, источники переходов, просмотренные страницы,
                техническую информацию о визитах и то, как используется сайт.
                Состав обрабатываемых данных зависит от настроек и работы
                соответствующего сервиса.
              </p>
            </section>

            <section>
              <h2><span>03</span> Google Analytics</h2>
              <p>
                После согласия Google Analytics 4 может сохранять cookie и
                использовать браузерные идентификаторы для различения визитов и
                подготовки статистики. Идентификатор ресурса в этой политике не
                публикуется. Подробнее об использовании данных Google можно
                узнать на странице{" "}
                <a href="https://policies.google.com/technologies/partner-sites?hl=ru" target="_blank" rel="noreferrer">
                  «Как Google использует данные»
                </a>.
              </p>
            </section>

            <section>
              <h2><span>04</span> Яндекс Метрика</h2>
              <p>
                После согласия Яндекс Метрика может использовать cookie и
                идентификаторы в хранилище браузера. В зависимости от работы
                сервиса среди них могут встречаться <code>_ym_uid</code>,{" "}
                <code>_ym_d</code>, <code>_ym_isad</code> и другие значения;
                этот список может меняться. Подробнее — в{" "}
                <a href="https://yandex.ru/support/metrica/ru/general/cookie-usage" target="_blank" rel="noreferrer">
                  справке Яндекс Метрики о cookie
                </a>.
              </p>
            </section>

            <section>
              <h2><span>05</span> Управление cookie</h2>
              <p>
                Вы можете принять или отклонить аналитические cookie при первом
                посещении, а затем в любой момент изменить выбор. Необходимые
                cookie отключить в интерфейсе нельзя: без них сайт не сможет
                запомнить вашу настройку.
              </p>
              <CookieSettingsButton className="button dark policy-cookie-button">
                Настроить cookie
              </CookieSettingsButton>
            </section>

            <section>
              <h2><span>06</span> Срок хранения</h2>
              <p>
                Настройка <code>cookie_consent</code> хранится 180 дней с момента
                последнего выбора. Сроки хранения аналитических cookie зависят
                от соответствующего сервиса и могут изменяться. Вы также можете
                удалить cookie и данные сайтов средствами своего браузера.
              </p>
            </section>

            <section>
              <h2><span>07</span> Изменение политики</h2>
              <p>
                Политика может обновляться при изменении функций сайта,
                подключённых аналитических инструментов или требований к
                обработке данных. Актуальная версия всегда размещается на этой
                странице.
              </p>
            </section>

            <section>
              <h2><span>08</span> Контакты</h2>
              <p>
                По вопросам использования cookie напишите на{" "}
                <a href={"mailto:" + site.email}>{site.email}</a>.
              </p>
            </section>

            <p className="policy-updated">Дата последнего обновления: 12 сентября 2026 г.</p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
