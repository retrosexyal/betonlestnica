import type { WorkImage } from "./works";

export type PriceExample = {
  id: string;
  title: string;
  shortTitle: string;
  amount: number;
  from: boolean;
  description: string;
  workSlugs: string[];
  images: WorkImage[];
};

const image = (file: string, alt: string): WorkImage => ({
  src: `/images/photos/${file}.webp`, alt,
});

// Prices and configurations supplied by the customer on 6 October 2026.
// All amounts are starting prices; materials, delivery and concrete works included.
export const priceExamples: PriceExample[] = [
  {
    id: "s-ploshchadkami", title: "Лестница с прямыми площадками", shortTitle: "С площадками",
    amount: 5000, from: true,
    description: "Прямые марши и поворотные площадки. Спокойная геометрия с гладкой нижней поверхностью для подъёма между этажами.",
    workSlugs: ["p-obraznye-betonnye-lestnitsy", "g-obraznye-betonnye-lestnitsy"],
    images: [image("5k_1", "Бетонная лестница с прямыми маршами и площадкой, стоимость от 5 000 BYN без отделки"), image("5k_2", "Вид сверху на поворотную площадку и бетонные ступени лестницы")],
  },
  {
    id: "na-monokosoure", title: "Консольные ступени на монокосоуре", shortTitle: "На монокосоуре",
    amount: 6000, from: true,
    description: "Одна несущая бетонная балка и открытые ступени. Решение для интерьера или наружного подъёма с выразительным силуэтом.",
    workSlugs: ["konsolnye-betonnye-lestnitsy", "pryamye-betonnye-lestnitsy", "ulichnye-betonnye-lestnitsy"],
    images: [image("6k_1", "Бетонная лестница с консольными ступенями на монокосоуре внутри дома"), image("6k_2", "Наружная бетонная лестница на монокосоуре вдоль фасада")],
  },
  {
    id: "s-obratnymi-stupenyami", title: "Лестница с обратными ступенями", shortTitle: "Обратные ступени",
    amount: 6000, from: true,
    description: "Зеркальная лестница: нижняя поверхность повторяет ступенчатый профиль марша. Геометрия выразительно смотрится сбоку и снизу.",
    workSlugs: ["lestnitsy-s-obratnymi-stupenyami"],
    images: [image("6k_1_obr", "Зеркальная бетонная лестница с обратными ступенями, вид нижнего профиля"), image("6k_2_obr", "Поворот и верхние ступени бетонной лестницы с обратным низом")],
  },
  {
    id: "radiusnaya-gladkaya", title: "Радиусная лестница с гладким основанием", shortTitle: "Радиусная, гладкий низ",
    amount: 6500, from: true,
    description: "Плавный поворот марша и цельная нижняя поверхность. Радиус и положение лестницы подбираются под существующий проём.",
    workSlugs: ["radiusnye-betonnye-lestnitsy", "vintovye-betonnye-lestnitsy"],
    images: [image("r_6.5k_1", "Радиусная бетонная лестница с гладким основанием, вид снизу"), image("r_6.5k_2", "Изогнутый монолитный марш с гладким низом в кирпичном доме")],
  },
  {
    id: "radiusnaya-s-bortom", title: "Радиусные ступени, борт и стела", shortTitle: "Радиусная с бортом",
    amount: 10000, from: true,
    description: "Скруглённые ступени, монолитный борт и стела формируют единую скульптурную конструкцию с плавным поворотом.",
    workSlugs: ["radiusnye-betonnye-lestnitsy", "vintovye-betonnye-lestnitsy"],
    images: [image("10k_1", "Радиусная лестница с закруглёнными ступенями, бетонным бортом и стелой"), image("10k_2", "Вид сверху на радиусные ступени и монолитный борт лестницы")],
  },
  {
    id: "radiusnaya-na-monokosoure", title: "Радиусная лестница на монокосоуре", shortTitle: "Радиусная на косоуре",
    amount: 9000, from: true,
    description: "Криволинейный монокосоур с консольными ступенями. Открытый марш подчёркивает форму поворота и оставляет пространство под лестницей.",
    workSlugs: ["radiusnye-betonnye-lestnitsy", "konsolnye-betonnye-lestnitsy"],
    images: [image("9k_2", "Радиусная лестница на бетонном монокосоуре с открытыми консольными ступенями"), image("9k_1", "Закруглённые консольные ступени радиусной бетонной лестницы")],
  },
  {
    id: "radiusnaya-obratnye-stupeni", title: "Радиусная с бортом и обратными ступенями", shortTitle: "Радиусная, обратный низ",
    amount: 10000, from: true,
    description: "Борт, стела и обратный ступенчатый низ в одной радиусной конструкции. Выразительный вариант для открытого лестничного пространства.",
    workSlugs: ["radiusnye-betonnye-lestnitsy", "lestnitsy-s-obratnymi-stupenyami"],
    images: [image("10k_obr_1", "Радиусная монолитная лестница с бортом, стелой и обратными ступенями")],
  },
  {
    id: "radiusnaya-na-tetivakh", title: "Радиусная лестница на тетивах", shortTitle: "Радиусная на тетивах",
    amount: 9000, from: true,
    description: "Боковые несущие балки повторяют радиус марша. Между тетивами — открытые бетонные ступени с плавным разворотом.",
    workSlugs: ["betonnye-lestnitsy-na-tetivakh", "radiusnye-betonnye-lestnitsy"],
    images: [image("9k_titiva_2", "Радиусная бетонная лестница на тетивах в кирпичном доме"), image("9k_tititva_1", "Монолитная лестница с двумя изогнутыми тетивами и открытыми ступенями")],
  },
];

export function formatPrice(example: PriceExample) {
  return `${example.from ? "от " : ""}${new Intl.NumberFormat("ru-BY").format(example.amount)} BYN`;
}

export const priceNote = "Все цены — от указанной суммы, в белорусских рублях. В стоимость бетонной конструкции под ключ входят материалы, доставка и работы. Отделка и ограждения рассчитываются отдельно. Окончательная цена зависит от размеров, комплектации и условий на объекте.";

export function pricesForWork(slug: string) {
  return priceExamples.filter((example) => example.workSlugs.includes(slug));
}
