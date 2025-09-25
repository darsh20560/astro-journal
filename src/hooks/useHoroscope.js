import { useCallback, useEffect, useState } from 'react';
import { fetchTodayHoroscope } from '../services/horoscopeService';

export function useHoroscope(sign) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetchTodayHoroscope(sign);
    setData(res.data);
    setFromCache(!!res.fromCache);
    setError(res.error || null);
    setLoading(false);
  }, [sign]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load, fromCache };
} 