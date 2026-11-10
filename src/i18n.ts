import { getCollection } from 'astro:content';

export type Lang = 'en' | 'uk';

/** Build a link for the given language: "/homework/" -> "/uk/homework/". */
export const href = (lang: Lang, path = '/') => (lang === 'uk' ? `/uk${path}` : path);

/** Same page in the other language. */
export const swapLang = (lang: Lang, pathname: string) =>
  lang === 'uk' ? pathname.replace(/^\/uk/, '') || '/' : `/uk${pathname}`;

export const formatDate = (lang: Lang, d: Date) =>
  d.toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toLowerCase();

/** All published homework, newest first. */
export async function getHomework() {
  const all = await getCollection('homework', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const t = {
  en: {
    metaDesc: 'mariya popel, personal stylist in training. a paper diary of homework, closet edits and colour studies.',
    nav: { home: 'home', homework: 'homework', about: 'about', other: 'укр', otherLabel: 'Українською' },
    hero: {
      title: 'personal style diary',
      meta: '01 — homework — in public',
      note: 'dress like you mean it xx',
      cta: 'open the homework',
    },
    corner: ['mppl.style', 'stylist in training'],
    vol: 'vol. 01',
    palette: { name: 'soft autumn?', note: 'colour study' },
    capsule: {
      title: 'capsule checklist',
      items: ['white tee that actually fits', 'one good blazer', "jeans that don't fight back", 'shoes you can walk in', "something that's just you"],
    },
    fit: { caption: 'fit check', empty: 'fit pic coming soon' },
    hw: {
      title: 'the homework',
      sub: 'every assignment from the course: the brief, the work, what i learned.',
      note: 'graded by tutors, judged by me',
      empty: 'nothing here yet. first assignment loading…',
      nopic: 'no pic yet',
      all: 'all homework',
      back: 'all homework',
      spec: { assignment: 'assignment', module: 'module', date: 'date' },
    },
    plan: {
      title: "what i'm learning",
      note: 'science, but make it cute',
      cards: [
        { title: 'capsule wardrobes', body: 'fewer pieces, more outfits. closets that work on a random tuesday, not just on pinterest.' },
        { title: 'colour & body', body: 'which colours make your face light up and which cuts work with your shape.' },
        { title: 'closet edits & shopping', body: "we keep what you love, rehome what you don't, and shop only for the gaps." },
      ],
    },
    close: { l1: 'go get dressed', l2: 'xx' },
    about: {
      title: 'about me',
      note: 'hi!',
      p: [
        "i'm masha. i'm training as a personal stylist, and this site is my notebook for the course and, soon, my portfolio.",
        "what i'm into: capsule wardrobes that work on a random tuesday, colour and body analysis, and closet edits where we finally let go of the stuff that doesn't feel like you.",
        'want to say hi? contact details coming soon.',
      ],
      caption: 'me, soon',
      photoEmpty: 'portrait coming soon',
    },
    look: { title: 'outfit look', piece: 'piece' },
    footer: ['mariya popel', 'personal styling, in progress'],
  },
  uk: {
    metaDesc: 'маша попель, стилістка на навчанні. паперовий щоденник домашок, розборів шаф і колірних студій.',
    nav: { home: 'головна', homework: 'домашки', about: 'про мене', other: 'eng', otherLabel: 'In English' },
    hero: {
      title: 'щоденник стилю',
      meta: '01 — домашки — публічно',
      note: 'одягайся так, ніби так задумано xx',
      cta: 'відкрити домашки',
    },
    corner: ['mppl.style', 'стилістка на навчанні'],
    vol: 'вип. 01',
    palette: { name: "м'яка осінь?", note: 'колірна студія' },
    capsule: {
      title: 'капсула: чекліст',
      items: ['біла футболка, що нормально сідає', 'один хороший жакет', 'джинси, які з тобою не воюють', 'взуття, в якому можна ходити', 'щось просто твоє'],
    },
    fit: { caption: 'образ дня', empty: 'фото скоро' },
    hw: {
      title: 'домашки',
      sub: 'кожне завдання з курсу: бриф, робота і що я з цього винесла.',
      note: 'оцінюють викладачі, а суджу — я',
      empty: 'поки пусто. перше завдання вже завантажується…',
      nopic: 'фото скоро',
      all: 'усі домашки',
      back: 'усі домашки',
      spec: { assignment: 'завдання', module: 'модуль', date: 'дата' },
    },
    plan: {
      title: 'чого я вчуся',
      note: 'наука, але красива',
      cards: [
        { title: 'капсульний гардероб', body: 'менше речей, більше образів. шафа, яка працює у звичайний вівторок, а не лише в pinterest.' },
        { title: 'колір і фігура', body: 'які кольори роблять обличчя живим і які крої дружать з твоєю фігурою.' },
        { title: 'розбір шафи й шопінг', body: 'лишаємо те, що любиш, прощаємося з тим, що ні, і докуповуємо лише потрібне.' },
      ],
    },
    close: { l1: 'йди вдягайся', l2: 'xx' },
    about: {
      title: 'про мене',
      note: 'привіт!',
      p: [
        'я маша. вчуся на персональну стилістку, і цей сайт — мій конспект курсу, а скоро і портфоліо.',
        'що мені цікаво: капсульні гардероби, які працюють у звичайний вівторок, аналіз кольоротипу і фігури, і розбори шаф, де ми нарешті відпускаємо речі, які не про тебе.',
        'хочеш привітатися? контакти скоро будуть.',
      ],
      caption: 'я, скоро',
      photoEmpty: 'фото скоро',
    },
    look: { title: 'образ', piece: 'річ' },
    footer: ['маша попель', 'персональний стиль, у процесі'],
  },
} as const;
