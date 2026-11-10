import { getCollection } from 'astro:content';

/** All published homework, newest first. */
export async function getHomework() {
  const all = await getCollection('homework', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
