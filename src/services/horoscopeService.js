import { getJson, setJson, buildKey } from '../utils/storage';

const HOROSCOPE_CACHE_PREFIX = 'horoscope';

export const HOROSCOPE_MOCKS = {
  aries: {
    date: "2025-09-25",
    sign: "aries",
    horoscope: "Today brings strong energy for initiating new plans. Trust your instincts.",
    mood: "Adventurous",
    color: "Red",
    lucky_number: "5",
    description: "You’ll find opportunities in unexpected places—be bold and take the first step.",
  },
  taurus: {
    date: "2025-09-25",
    sign: "taurus",
    horoscope: "Patience leads to steady progress. Take time to appreciate daily comforts.",
    mood: "Calm",
    color: "Green",
    lucky_number: "15",
    description: "Focus on your goals, but don’t neglect those who support you.",
  },
  gemini: {
    date: "2025-09-25",
    sign: "gemini",
    horoscope: "Communication flows easily. Reach out and make new connections.",
    mood: "Curious",
    color: "Yellow",
    lucky_number: "3",
    description: "Sharing your ideas will open new doors. Stay flexible.",
  },
  cancer: {
    date: "2025-09-25",
    sign: "cancer",
    horoscope: "Listen to your intuition in personal matters. Home feels especially comforting.",
    mood: "Sensitive",
    color: "Silver",
    lucky_number: "8",
    description: "Take care of your own needs before helping others today.",
  },
  leo: {
    date: "2025-09-25",
    sign: "leo",
    horoscope: "Your creativity shines—take the spotlight. Others notice your efforts.",
    mood: "Confident",
    color: "Gold",
    lucky_number: "1",
    description: "Be generous but stay humble. Your leadership is inspiring.",
  },
  virgo: {
    date: "2025-09-25",
    sign: "virgo",
    horoscope: "Focus and organization allow you to check off your to-do list.",
    mood: "Practical",
    color: "Navy Blue",
    lucky_number: "14",
    description: "Details matter today. Invest effort into small improvements.",
  },
  libra: {
    date: "2025-09-25",
    sign: "libra",
    horoscope: "Harmony is within reach if you keep an open mind in discussions.",
    mood: "Diplomatic",
    color: "Pink",
    lucky_number: "6",
    description: "Mediation brings out your strengths—help resolve a conflict.",
  },
  scorpio: {
    date: "2025-09-25",
    sign: "scorpio",
    horoscope: "Investigate deeper motives. Your passion draws others closer.",
    mood: "Intense",
    color: "Black",
    lucky_number: "9",
    description: "Face your fears—transformation is possible if you embrace change.",
  },
  sagittarius: {
    date: "2025-09-25",
    sign: "sagittarius",
    horoscope: "Adventure calls. Say yes to new experiences.",
    mood: "Optimistic",
    color: "Purple",
    lucky_number: "12",
    description: "Learning something new will bring long-term rewards.",
  },
  capricorn: {
    date: "2025-09-25",
    sign: "capricorn",
    horoscope: "Ambition pays off if you plan carefully. Stay persistent.",
    mood: "Disciplined",
    color: "Brown",
    lucky_number: "22",
    description: "Balance work and rest—you can achieve your goals methodically.",
  },
  aquarius: {
    date: "2025-09-25",
    sign: "aquarius",
    horoscope: "Original thinking leads to breakthroughs today. Embrace what makes you unique.",
    mood: "Innovative",
    color: "Turquoise",
    lucky_number: "17",
    description: "Working with a group inspires big ideas—collaborate.",
  },
  pisces: {
    date: "2025-09-25",
    sign: "pisces",
    horoscope: "Dreams and intuition are strong. Take time to recharge.",
    mood: "Compassionate",
    color: "Sea Green",
    lucky_number: "11",
    description: "Express your feelings creatively. Gentle actions speak volumes.",
  },
};


function getSignKey(sign) {
  return buildKey([HOROSCOPE_CACHE_PREFIX, sign]);
}

function getTodayKey(sign) {
  const today = new Date();
  const dateKey = today.toISOString().slice(0,10);
  return buildKey([HOROSCOPE_CACHE_PREFIX, sign, dateKey]);
}

export async function fetchTodayHoroscope(sign) {
  const cacheKey = getTodayKey(sign);
  // Try today's cache first (for real API)
  const cached = await getJson(cacheKey, null);
  if (cached) return { data: cached, fromCache: true };

  try {
    const body = new URLSearchParams({ sign, day: 'today' });
    const res = await fetch('https://aztro.sameerkumar.website/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!res.ok) throw new Error(`Horoscope API failed: ${res.status}`);
    const json = await res.json();
    await setJson(cacheKey, json);
    await setJson(getSignKey(sign), json);
    return { data: json, fromCache: false };
  } catch (error) {
    const fallbackCache = await getJson(getSignKey(sign), null);
    if (fallbackCache)
      return { data: fallbackCache, fromCache: true, error };
    const mock = HOROSCOPE_MOCKS[sign.toLowerCase()];
    if (mock)
      return { data: mock, fromCache: false, error: 'API failed, using static mock' };
    return { data: null, error };
  }
}
