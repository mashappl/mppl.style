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
    mood: 'mood 001',
    descriptor: 'styling portfolio',
    count: (n: number) => `${String(n).padStart(2, '0')} homework${n === 1 ? '' : 's'}`,
    homeworkN: 'homework',
    viewStudy: 'view study',
    allHomeworks: 'all homeworks',
    backAll: 'back to all homeworks',
    notebook: 'styling notebook',
    sections: { start: 'the starting point', notice: 'what i notice', outfits: 'putting it together', reflection: 'reflection' },
    index: { title: ['the', 'coursework.'], lede: 'Every assignment from my personal stylist course, one study at a time.' },
    hero: {
      lines: ['mppl.style', 'personal', 'style diary'],
      spec: [
        { k: 'stylist', v: 'mariya popel' },
        { k: 'course', v: 'personal styling' },
        { k: 'status', v: 'in training' },
      ],
      note: 'dress like you mean it',
      cta: 'open the homework',
    },
    detail: 'detail',
    capsule: { title: 'capsule checklist', items: ['white tee that fits', 'one good blazer', "jeans that don't fight back", 'shoes you can walk in'] },
    fit: { empty: 'fit pic coming soon' },
    hw: {
      title: 'the homework',
      sub: 'every assignment from my personal stylist course lives here: the brief, the work, and what i learned. graded by tutors, judged by me.',
      notes: ['new homework', 'the brief + the work', 'what i learned'],
      empty: 'nothing here yet. first assignment loading…',
      nopic: 'no pic yet',
      all: 'all homework',
      back: 'all homework',
      spec: { assignment: 'assignment', module: 'module', date: 'date' },
    },
    plan: {
      quote: ['fewer pieces,', 'more outfits,', 'zero panic.'],
      note: "what i'm learning",
      cards: [
        { title: ['capsule', 'wardrobes'], body: 'closets that work on a random tuesday, not just on pinterest.' },
        { title: ['colour', '& body'], body: 'which colours make your face light up and which cuts love your shape.' },
        { title: ['closet edits', '& shopping'], body: "keep what you love, rehome what you don't, shop only for the gaps." },
      ],
    },
    close: { lines: ['dress like you mean it,', 'and it will mean something.'], note: 'xx' },
    about: {
      title: 'about me',
      note: 'hi!',
      p: [
        "i'm masha. i'm training as a personal stylist, and this site is my notebook for the course and, soon, my portfolio.",
        "i'm into capsule wardrobes that work on a random tuesday, colour and body analysis, and closet edits where we finally let go of the stuff that doesn't feel like you.",
        'want to say hi? contact details coming soon.',
      ],
      caption: ['mariya', 'popel', 'stylist in training'],
      photoEmpty: 'portrait coming soon',
    },
    look: { title: 'outfit look', piece: 'piece' },
    footer: ['@mppl.style', 'personal styling, in progress'],
  },
  uk: {
    metaDesc: 'маша попель, стилістка на навчанні. паперовий щоденник домашок, розборів шаф і колірних студій.',
    nav: { home: 'головна', homework: 'домашки', about: 'про мене', other: 'eng', otherLabel: 'In English' },
    mood: 'настрій 001',
    descriptor: 'портфоліо стиліста',
    count: (n: number) => `${String(n).padStart(2, '0')} домашк${n === 1 ? 'а' : n > 1 && n < 5 ? 'и' : 'ок'}`,
    homeworkN: 'домашка',
    viewStudy: 'дивитись',
    allHomeworks: 'усі домашки',
    backAll: 'назад до всіх домашок',
    notebook: 'зошит стиліста',
    sections: { start: 'відправна точка', notice: 'що я помічаю', outfits: 'збираємо разом', reflection: 'рефлексія' },
    index: { title: ['мої', 'домашки.'], lede: 'Кожне завдання з курсу персонального стиліста, по одному дослідженню.' },
    hero: {
      lines: ['mppl.style', 'щоденник', 'стилю'],
      spec: [
        { k: 'стилістка', v: 'маша попель' },
        { k: 'курс', v: 'персональний стиліст' },
        { k: 'статус', v: 'навчаюсь' },
      ],
      note: 'одягайся так, ніби так задумано',
      cta: 'відкрити домашки',
    },
    detail: 'деталь',
    capsule: { title: 'капсула: чекліст', items: ['біла футболка, що сідає', 'один хороший жакет', 'джинси, які не воюють', 'взуття, в якому можна ходити'] },
    fit: { empty: 'фото скоро' },
    hw: {
      title: 'домашки',
      sub: 'тут живе кожне завдання з курсу персонального стиліста: бриф, робота і що я з цього винесла. оцінюють викладачі, а суджу – я.',
      notes: ['нова домашка', 'бриф + робота', 'що я винесла'],
      empty: 'поки пусто. перше завдання вже завантажується…',
      nopic: 'фото скоро',
      all: 'усі домашки',
      back: 'усі домашки',
      spec: { assignment: 'завдання', module: 'модуль', date: 'дата' },
    },
    plan: {
      quote: ['менше речей,', 'більше образів,', 'нуль паніки.'],
      note: 'чого я вчуся',
      cards: [
        { title: ['капсульний', 'гардероб'], body: 'шафа, яка працює у звичайний вівторок, а не лише в pinterest.' },
        { title: ['колір', 'і фігура'], body: 'які кольори роблять обличчя живим і які крої дружать з твоєю фігурою.' },
        { title: ['розбір шафи', 'й шопінг'], body: 'лишаємо те, що любиш, прощаємося з рештою, докуповуємо лише потрібне.' },
      ],
    },
    close: { lines: ['одягайся так, ніби так задумано,', 'і воно справді матиме сенс.'], note: 'xx' },
    about: {
      title: 'про мене',
      note: 'привіт!',
      p: [
        'я маша. вчуся на персональну стилістку, і цей сайт – мій конспект курсу, а скоро і портфоліо.',
        'мені цікаві капсульні гардероби, які працюють у звичайний вівторок, аналіз кольоротипу і фігури, і розбори шаф, де ми нарешті відпускаємо речі, які не про тебе.',
        'хочеш привітатися? контакти скоро будуть.',
      ],
      caption: ['маша', 'попель', 'стилістка на навчанні'],
      photoEmpty: 'фото скоро',
    },
    look: { title: 'образ', piece: 'річ' },
    footer: ['@mppl.style', 'персональний стиль, у процесі'],
  },
} as const;
