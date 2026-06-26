import type { Lang } from "./translations";

type Localized = Record<Lang, string>;

export type Testimonial = {
  quote: Localized;
  role: Localized;
  name: string;
  rating: number;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "I genuinely cannot go back to supermarket honey. The Acacia tastes like liquid sunlight — and the unboxing feels like opening fine perfume.",
      bg: "Наистина не мога да се върна към супермаркетния мед. Акациевият е като течна слънчева светлина — а разопаковането е като отваряне на фин парфюм.",
    },
    role: { en: "Pastry Chef, Lumière", bg: "Сладкар, Lumière" },
    name: "Elena Marchetti",
    rating: 5,
    initials: "EM",
  },
  {
    quote: {
      en: "The transparency is unreal. Every jar has a batch number that tells you the exact hive and harvest week. Worth every cent.",
      bg: "Прозрачността е невероятна. Всеки буркан има номер на партида, който показва точния кошер и седмицата на събиране. Струва си всеки цент.",
    },
    role: { en: "Founder, Wellbeing Co.", bg: "Основател, Wellbeing Co." },
    name: "David Okafor",
    rating: 5,
    initials: "DO",
  },
  {
    quote: {
      en: "We switched our entire tasting menu to Wolf's Honey. Guests literally ask which honey we use. The herb honey pairs perfectly with aged cheese.",
      bg: "Сменихме цялото си дегустационно меню с Wolf's Honey. Гостите буквално питат какъв мед използваме. Билковият пасва идеално на отлежало сирене.",
    },
    role: { en: "Sommelier, Nord", bg: "Сомелиер, Nord" },
    name: "Sofia Bergström",
    rating: 5,
    initials: "SB",
  },
  {
    quote: {
      en: "Beautiful product, beautiful values. Knowing the hives are carbon-negative makes the morning ritual feel even better.",
      bg: "Прекрасен продукт, прекрасни ценности. Това, че кошерите са въглеродно-неутрални, прави сутрешния ритуал още по-хубав.",
    },
    role: { en: "Designer & Subscriber", bg: "Дизайнер и абонат" },
    name: "Marcus Lee",
    rating: 5,
    initials: "ML",
  },
  {
    quote: {
      en: "Fast shipping, flawless packaging, and a flavour depth I did not know honey could have. Nothing else on the shelf comes close.",
      bg: "Бърза доставка, безупречна опаковка и дълбочина на вкуса, която не знаех, че медът може да има. Нищо друго по рафтовете не се доближава.",
    },
    role: { en: "Food Writer", bg: "Кулинарен автор" },
    name: "Amara Singh",
    rating: 5,
    initials: "AS",
  },
];
