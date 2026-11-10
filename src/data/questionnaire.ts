// Client questionnaire (homework 01). Edit questions here; both languages live side by side.
import type { Lang } from '../i18n';

type L = Record<Lang, string>;
export type Field =
  | { id: string; type: 'text' | 'email' | 'textarea'; label: L; hint?: L; half?: boolean }
  | { id: string; type: 'choice' | 'multi'; label: L; options: L[] }
  | { id: string; type: 'scale'; label: L; ends: [L, L] };
export type Section = { id: string; title: L; intro?: L; fields: Field[] };

const body: L[] = [
  { en: 'shoulders', uk: 'плечі' }, { en: 'neckline', uk: 'декольте' }, { en: 'arms', uk: 'руки' },
  { en: 'waist', uk: 'талія' }, { en: 'hips', uk: 'стегна' }, { en: 'legs', uk: 'ноги' }, { en: 'back', uk: 'спина' },
];

export const questionnaire: Section[] = [
  {
    id: 'about', title: { en: 'about you', uk: 'про тебе' },
    fields: [
      { id: 'name', type: 'text', label: { en: 'Name', uk: "Ім'я" }, half: true },
      { id: 'city', type: 'text', label: { en: 'City', uk: 'Місто' }, half: true },
      { id: 'age', type: 'choice', label: { en: 'Age', uk: 'Вік' }, options: [
        { en: 'under 25', uk: 'до 25' }, { en: '25–34', uk: '25–34' }, { en: '35–44', uk: '35–44' }, { en: '45–54', uk: '45–54' }, { en: '55+', uk: '55+' },
      ] },
      { id: 'job', type: 'text', label: { en: 'What do you do?', uk: 'Чим ти займаєшся?' } },
      { id: 'week', type: 'textarea', label: { en: 'What does a normal week look like for you?', uk: 'Як виглядає твій звичайний тиждень?' }, hint: { en: 'Work, weekends, kids, events, travel…', uk: 'Робота, вихідні, діти, події, подорожі…' } },
    ],
  },
  {
    id: 'style', title: { en: 'your style now', uk: 'твій стиль зараз' },
    fields: [
      { id: 'words-now', type: 'text', label: { en: 'Three words for how you dress now', uk: 'Три слова про те, як ти вдягаєшся зараз' }, half: true },
      { id: 'words-want', type: 'text', label: { en: 'Three words you’d like people to use', uk: 'Три слова, які ти хочеш чути про свій стиль' }, half: true },
      { id: 'favourite', type: 'textarea', label: { en: 'Which pieces feel most like you?', uk: 'Які речі найбільше «про тебе»?' } },
      { id: 'frustration', type: 'textarea', label: { en: 'What frustrates you about getting dressed?', uk: 'Що тебе дратує, коли вдягаєшся?' } },
      { id: 'icons', type: 'text', label: { en: 'Anyone whose style you love?', uk: 'Чий стиль тобі подобається?' }, hint: { en: 'People, accounts, films, brands', uk: 'Люди, акаунти, фільми, бренди' } },
    ],
  },
  {
    id: 'fit', title: { en: 'body & fit', uk: 'фігура і посадка' },
    fields: [
      { id: 'height', type: 'text', label: { en: 'Height', uk: 'Зріст' }, half: true },
      { id: 'sizes', type: 'text', label: { en: 'Usual sizes (top / bottom / shoes)', uk: 'Звичні розміри (верх / низ / взуття)' }, half: true },
      { id: 'fit', type: 'choice', label: { en: 'How do you like clothes to fit?', uk: 'Як тобі подобається, щоб сідав одяг?' }, options: [
        { en: 'close to the body', uk: 'по фігурі' }, { en: 'relaxed', uk: 'вільно' }, { en: 'oversized', uk: 'оверсайз' }, { en: 'depends', uk: 'залежить' },
      ] },
      { id: 'highlight', type: 'multi', label: { en: 'What would you like to highlight?', uk: 'Що хочеться підкреслити?' }, options: body },
      { id: 'soften', type: 'multi', label: { en: 'What would you like to soften?', uk: 'Що хочеться пом’якшити?' }, options: body },
    ],
  },
  {
    id: 'colour', title: { en: 'colour', uk: 'колір' },
    fields: [
      { id: 'love', type: 'text', label: { en: 'Colours you love wearing', uk: 'Кольори, які любиш носити' }, half: true },
      { id: 'avoid', type: 'text', label: { en: 'Colours you avoid', uk: 'Кольори, яких уникаєш' }, half: true },
      { id: 'features', type: 'text', label: { en: 'Natural hair and eye colour', uk: 'Природний колір волосся та очей' } },
      { id: 'metal', type: 'choice', label: { en: 'Jewellery you reach for', uk: 'Прикраси, які обираєш' }, options: [
        { en: 'gold', uk: 'золото' }, { en: 'silver', uk: 'срібло' }, { en: 'both', uk: 'обидва' }, { en: 'rarely wear any', uk: 'майже не ношу' },
      ] },
    ],
  },
  {
    id: 'life', title: { en: 'lifestyle & wardrobe', uk: 'спосіб життя і гардероб' },
    fields: [
      { id: 'dresscode', type: 'choice', label: { en: 'Dress code at work', uk: 'Дрес-код на роботі' }, options: [
        { en: 'formal', uk: 'офіційний' }, { en: 'smart casual', uk: 'смарт-кежуал' }, { en: 'casual', uk: 'кежуал' }, { en: 'uniform', uk: 'уніформа' }, { en: 'it varies', uk: 'по-різному' },
      ] },
      { id: 'occasions', type: 'multi', label: { en: 'What are you dressing for in the next months?', uk: 'Для чого вдягаєшся найближчі місяці?' }, options: [
        { en: 'everyday', uk: 'щодня' }, { en: 'work events', uk: 'робочі події' }, { en: 'interviews', uk: 'співбесіди' }, { en: 'weddings', uk: 'весілля' }, { en: 'dates', uk: 'побачення' }, { en: 'travel', uk: 'подорожі' },
      ] },
      { id: 'missing', type: 'textarea', label: { en: 'What feels missing from your wardrobe?', uk: 'Чого бракує у твоєму гардеробі?' } },
      { id: 'shopping', type: 'choice', label: { en: 'How often do you shop?', uk: 'Як часто купуєш одяг?' }, options: [
        { en: 'often', uk: 'часто' }, { en: 'every season', uk: 'щосезону' }, { en: 'rarely', uk: 'рідко' }, { en: 'only when something breaks', uk: 'лише коли щось зноситься' },
      ] },
    ],
  },
  {
    id: 'budget', title: { en: 'budget & values', uk: 'бюджет і цінності' },
    fields: [
      { id: 'budget', type: 'choice', label: { en: 'Comfortable spend on one key piece', uk: 'Комфортна сума за одну базову річ' }, options: [
        { en: 'up to €50', uk: 'до €50' }, { en: '€50–150', uk: '€50–150' }, { en: '€150–400', uk: '€150–400' }, { en: '€400+', uk: '€400+' },
      ] },
      { id: 'brands', type: 'text', label: { en: 'Shops or brands you like', uk: 'Магазини чи бренди, які подобаються' } },
      { id: 'sustain', type: 'scale', label: { en: 'How much does buying less / second-hand matter to you?', uk: 'Наскільки для тебе важливо купувати менше / секонд-хенд?' }, ends: [{ en: 'not much', uk: 'не дуже' }, { en: 'a lot', uk: 'дуже' }] },
    ],
  },
  {
    id: 'goals', title: { en: 'goals', uk: 'цілі' },
    fields: [
      { id: 'want', type: 'multi', label: { en: 'What would you like help with?', uk: 'З чим потрібна допомога?' }, options: [
        { en: 'closet edit', uk: 'розбір шафи' }, { en: 'capsule wardrobe', uk: 'капсульний гардероб' }, { en: 'colour analysis', uk: 'аналіз кольоротипу' }, { en: 'personal shopping', uk: 'шопінг-супровід' }, { en: 'a look for an event', uk: 'образ на подію' }, { en: 'feeling more confident', uk: 'більше впевненості' },
      ] },
      { id: 'success', type: 'textarea', label: { en: 'In three months, what would make this feel worth it?', uk: 'Що через три місяці скаже тобі, що це було варте того?' } },
      { id: 'else', type: 'textarea', label: { en: 'Anything else I should know?', uk: 'Що ще мені варто знати?' } },
    ],
  },
  {
    id: 'contact', title: { en: 'how to reach you', uk: 'як з тобою зв’язатися' },
    fields: [
      { id: 'email', type: 'email', label: { en: 'Email', uk: 'Email' }, half: true },
      { id: 'channel', type: 'choice', label: { en: 'Best way to talk', uk: 'Як зручніше спілкуватися' }, options: [
        { en: 'email', uk: 'email' }, { en: 'instagram', uk: 'instagram' }, { en: 'telegram', uk: 'telegram' }, { en: 'phone call', uk: 'дзвінок' },
      ] },
    ],
  },
];

export const formText = {
  en: {
    note: 'Demo form — nothing is sent anywhere. Your answers stay in this browser.',
    submit: 'see my client profile',
    profile: 'client profile',
    print: 'print / save as pdf',
    edit: 'edit answers',
    empty: '—',
    sheetTitle: 'client questionnaire',
  },
  uk: {
    note: 'Демо-анкета — нічого нікуди не надсилається. Відповіді лишаються в цьому браузері.',
    submit: 'показати профіль клієнта',
    profile: 'профіль клієнта',
    print: 'друк / зберегти pdf',
    edit: 'редагувати відповіді',
    empty: '—',
    sheetTitle: 'анкета клієнта',
  },
} as const;
