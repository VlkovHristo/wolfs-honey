import type { Lang } from "./translations";

type Localized = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

export type Product = {
  id: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  notes: LocalizedList;
  /** Price in euros */
  price: number;
  origin: Localized;
  /** Harvest window for the quick-view */
  harvest: Localized;
  /** Flavour position on the floral (0) → robust (100) scale */
  flavor: number;
  /** Suggested pairings */
  pairings: LocalizedList;
  badge?: Localized;
  /** Gradient stops for the generated jar visual */
  from: string;
  to: string;
};

export const products: Product[] = [
  {
    id: "acacia",
    name: { en: "Acacia Honey", bg: "Акациев Мед" },
    tagline: {
      en: "Crystal-clear & delicate",
      bg: "Кристално бистър и деликатен",
    },
    description: {
      en: "Slow-pressed from wild acacia blossom high in the Rhodopes. Pale gold and glassy, with a clean, floral finish that stays liquid for months.",
      bg: "Бавно извлечен от диви акациеви цветове високо в Родопите. Бледозлатист и бистър, с чист флорален финал, който остава течен с месеци.",
    },
    notes: {
      en: ["Delicate", "Floral", "Slow to crystallise"],
      bg: ["Деликатен", "Флорален", "Бавно кристализира"],
    },
    price: 10,
    origin: { en: "Rhodope Mountains, Bulgaria", bg: "Родопите, България" },
    harvest: { en: "Late May 2025", bg: "Края на май 2025" },
    flavor: 22,
    pairings: {
      en: ["Soft cheese", "Green tea", "Warm toast"],
      bg: ["Меко сирене", "Зелен чай", "Топъл тост"],
    },
    badge: { en: "Bestseller", bg: "Хит продажби" },
    from: "#FBE3A1",
    to: "#E7A93A",
  },
  {
    id: "herbal",
    name: { en: "Wildflower & Herb Honey", bg: "Билков Мед" },
    tagline: { en: "Bold, aromatic & raw", bg: "Наситен, ароматен и суров" },
    description: {
      en: "Gathered from mountain herbs and wildflowers across the Rhodope meadows. Deep amber and richly aromatic, with a warm, complex herbal character.",
      bg: "Събран от планински билки и диви цветя из родопските ливади. Наситено кехлибарен и богато ароматен, с топъл, сложен билков характер.",
    },
    notes: {
      en: ["Herbal", "Aromatic", "Full-bodied"],
      bg: ["Билков", "Ароматен", "Плътен"],
    },
    price: 10,
    origin: { en: "Rhodope Mountains, Bulgaria", bg: "Родопите, България" },
    harvest: { en: "Mid-August 2025", bg: "Средата на август 2025" },
    flavor: 82,
    pairings: {
      en: ["Aged cheddar", "Black coffee", "Yoghurt & nuts"],
      bg: ["Отлежал чедър", "Черно кафе", "Кисело мляко с ядки"],
    },
    badge: { en: "Raw", bg: "Суров" },
    from: "#F4C45E",
    to: "#9E5D0F",
  },
];
