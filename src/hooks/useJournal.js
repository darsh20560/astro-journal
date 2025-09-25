import { useCallback, useEffect, useMemo, useState } from 'react';
import { addThought, getThoughts } from '../services/journalService';

export function useJournal(sign) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    const items = await getThoughts(sign, 200);
    setList(items);
    setLoading(false);
  }, [sign]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    await addThought(sign, trimmed);
    setText('');
    await load();
    return true;
  }, [text, sign, load]);

  return useMemo(() => ({ text, setText, loading, list, refresh: load, submit }), [text, setText, loading, list, load, submit]);
} 