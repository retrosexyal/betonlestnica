import type { Metadata } from "next";
import { PageFrame, ContactCTA } from "../content-ui";
import { ArticleCards } from "../article-ui";

const title = "Полезное о бетонных лестницах и строительстве дома";
const description = "Когда делать бетонную лестницу, как подготовить проём и выбрать поворотную конструкцию. Материалы Версаль с фотографиями выполненных работ.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/poleznoe" },
  openGraph: { title, description, url: "/poleznoe", images: [{ url: "/images/photos/9k_titiva_2.webp", alt: "Бетонная лестница на этапе строительства дома" }] },
};

export default function UsefulPage() {
  return <PageFrame title="Полезное" path="/poleznoe"><section className="wrap content-hero"><p className="eyebrow">ВЕРСАЛЬ / ПОМОГАЕМ РАЗОБРАТЬСЯ</p><h1>О лестнице — до начала работ.</h1><p className="content-lead">Что предусмотреть при строительстве дома, какие данные подготовить и как сравнить конструкции. Объясняем на примерах и фотографиях наших работ.</p></section><section className="wrap article-list" aria-label="Статьи о бетонных лестницах"><ArticleCards /></section><ContactCTA title="От вопросов — к вашему проекту." /></PageFrame>;
}
