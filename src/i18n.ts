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
    metaDesc: 'masha popel, personal stylist in training. homework, closet edits and colour obsessions, posted in public.',
    nav: { home: 'home', homework: 'homework', about: 'about me', other: 'укр', otherLabel: 'Українською' },
    hero: {
      l1: 'dress like you',
      l2: 'mean it',
      sub: "hi, i'm masha. personal stylist in training. this is where my homework, closet edits and colour obsessions live, in public xx",
      cta: 'see the homework',
    },
    palette: { file: 'colour_season.png', name: 'soft autumn?', note: 'practice board' },
    capsule: {
      title: 'capsule checklist',
      items: ['white tee that actually fits', 'one good blazer', "jeans that don't fight back", 'shoes you can walk in', "something that's just you"],
    },
    fit: { file: 'fit_check.jpg', empty: 'fit pic loading…' },
    folders: ['homework', 'colour', 'closet'],
    stamp: ['stylist in training', 'handle with care'],
    scribble: 'new!',
    hw: {
      h1: 'the', h2: 'homework',
      sub: 'every assignment from the course: the brief, the work, what i learned.',
      empty: 'nothing here yet. first assignment loading…',
      nopic: 'no pic yet',
      all: 'open all homework',
      back: 'all homework',
    },
    plan: {
      h1: "what i'm", h2: 'learning',
      cards: [
        { title: 'capsule wardrobes', body: 'fewer pieces, more outfits. closets that work on a random tuesday, not just on pinterest.' },
        { title: 'colour & body', body: 'which colours make your face light up and which cuts work with your shape. science, but make it cute.' },
        { title: 'closet edits & shopping', body: "we keep what you love, rehome what you don't, and shop for the gaps. bye, jeans from 2017." },
      ],
    },
    close: { l1: "ok that's it.", l2: 'go get dressed xx' },
    about: {
      title: 'about', titleEm: 'me',
      notes: 'notes',
      p: [
        "hey, i'm masha. i'm training as a personal stylist, and this site is my notebook for the course and, soon, my portfolio.",
        "what i'm into: capsule wardrobes that work on a random tuesday, colour and body analysis, and closet edits where we finally let go of the stuff that doesn't feel like you.",
        'want to say hi? contact details coming soon.',
      ],
      photo: 'me.jpg',
      photoEmpty: 'portrait coming soon',
    },
    footer: 'personal styling, in progress',
  },
  uk: {
    metaDesc: 'маша попель, стилістка на навчанні. домашки, розбори шаф і колірні одержимості, публічно.',
    nav: { home: 'головна', homework: 'домашки', about: 'про мене', other: 'eng', otherLabel: 'In English' },
    hero: {
      l1: 'одягайся так,',
      l2: 'ніби так задумано',
      sub: 'привіт, я маша. вчуся на персональну стилістку. тут живуть мої домашки, розбори шаф і колірні одержимості, все публічно xx',
      cta: 'дивитись домашки',
    },
    palette: { file: 'kolorotyp.png', name: "м'яка осінь?", note: 'тренувальна дошка' },
    capsule: {
      title: 'капсула: чекліст',
      items: ['біла футболка, що нормально сідає', 'один хороший жакет', 'джинси, які з тобою не воюють', 'взуття, в якому можна ходити', 'щось просто твоє'],
    },
    fit: { file: 'fit_check.jpg', empty: 'фото завантажується…' },
    folders: ['домашки', 'колір', 'шафа'],
    stamp: ['стилістка на навчанні', 'обережно, крихке'],
    scribble: 'нове!',
    hw: {
      h1: 'мої', h2: 'домашки',
      sub: 'кожне завдання з курсу: бриф, робота і що я з цього винесла.',
      empty: 'поки пусто. перше завдання вже завантажується…',
      nopic: 'фото скоро',
      all: 'усі домашки',
      back: 'усі домашки',
    },
    plan: {
      h1: 'чого я', h2: 'вчуся',
      cards: [
        { title: 'капсульний гардероб', body: 'менше речей, більше образів. шафа, яка працює у звичайний вівторок, а не лише в pinterest.' },
        { title: 'колір і фігура', body: 'які кольори роблять обличчя живим і які крої дружать з твоєю фігурою. наука, але красива.' },
        { title: 'розбір шафи й шопінг', body: 'лишаємо те, що любиш, прощаємося з тим, що ні, і докуповуємо лише потрібне.' },
      ],
    },
    close: { l1: 'ну все.', l2: 'йди вдягайся xx' },
    about: {
      title: 'про', titleEm: 'мене',
      notes: 'нотатки',
      p: [
        'привіт, я маша. вчуся на персональну стилістку, і цей сайт — мій конспект курсу, а скоро і портфоліо.',
        'що мені цікаво: капсульні гардероби, які працюють у звичайний вівторок, аналіз кольоротипу і фігури, і розбори шаф, де ми нарешті відпускаємо речі, які не про тебе.',
        'хочеш привітатися? контакти скоро будуть.',
      ],
      photo: 'ya.jpg',
      photoEmpty: 'фото скоро',
    },
    footer: 'персональний стиль, у процесі',
  },
} as const;
