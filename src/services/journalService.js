import { buildKey, getJson, setJson } from '../utils/storage';

const JOURNAL_PREFIX = 'journal';

function dayKey(date = new Date()) {
  return date.toISOString().slice(0,10); // YYYY-MM-DD
}

function itemsKey(sign) {
  return buildKey([JOURNAL_PREFIX, sign, 'items']);
}

export async function addThought(sign, text) {
  const listK = itemsKey(sign);
  const date = new Date();
  const item = {
    id: `${date.getTime()}`,
    text,
    date: dayKey(date),
    createdAt: date.toISOString()
  };
  const list = (await getJson(listK, [])) || [];
  list.unshift(item);
  await setJson(listK, list);
  return item;
}

export async function getThoughts(sign, limit = 100) {
  const list = (await getJson(itemsKey(sign), [])) || [];
  return list.slice(0, limit);
}

export async function getTodayThoughts(sign) {
  const today = dayKey(new Date());
  const list = (await getJson(itemsKey(sign), [])) || [];
  return list.filter(i => i.date === today);
} 