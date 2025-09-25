import AsyncStorage from '@react-native-async-storage/async-storage';

const NAMESPACE = 'astrojournal';

function withNs(key) {
  return `${NAMESPACE}:${key}`;
}

export async function setJson(key, value) {
  try {
    const serialized = JSON.stringify(value);
    await AsyncStorage.setItem(withNs(key), serialized);
    return true;
  } catch (error) {
    console.warn('setJson error', key, error);
    return false;
  }
}

export async function getJson(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(withNs(key));
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn('getJson error', key, error);
    return fallback;
  }
}

export async function remove(key) {
  try {
    await AsyncStorage.removeItem(withNs(key));
    return true;
  } catch (error) {
    console.warn('remove error', key, error);
    return false;
  }
}

export async function multiSet(pairs) {
  try {
    const withNsPairs = pairs.map(([k, v]) => [withNs(k), JSON.stringify(v)]);
    await AsyncStorage.multiSet(withNsPairs);
    return true;
  } catch (error) {
    console.warn('multiSet error', error);
    return false;
  }
}

export async function multiGet(keys) {
  try {
    const result = await AsyncStorage.multiGet(keys.map(withNs));
    const mapped = {};
    result.forEach(([k, v]) => {
      const plainKey = k.replace(`${NAMESPACE}:`, '');
      try { mapped[plainKey] = v ? JSON.parse(v) : null; } catch (_) { mapped[plainKey] = null; }
    });
    return mapped;
  } catch (error) {
    console.warn('multiGet error', error);
    return {};
  }
}

export function buildKey(parts) {
  return parts.filter(Boolean).join(':');
} 