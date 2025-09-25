import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getJson, setJson } from '../utils/storage';

const SettingsContext = createContext(null);
const SELECTED_SIGN_KEY = 'settings:selectedSign';
const DEFAULT_SIGN = 'aries';

export function SettingsProvider({ children }) {
  const [selectedSign, setSelectedSignState] = useState(DEFAULT_SIGN);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await getJson(SELECTED_SIGN_KEY, DEFAULT_SIGN);
      setSelectedSignState(saved || DEFAULT_SIGN);
      setHydrated(true);
    })();
  }, []);

  const setSelectedSign = async (sign) => {
    setSelectedSignState(sign);
    await setJson(SELECTED_SIGN_KEY, sign);
  };

  const value = useMemo(() => ({ selectedSign, setSelectedSign, hydrated }), [selectedSign, hydrated]);

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export const ZODIAC_SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
]; 