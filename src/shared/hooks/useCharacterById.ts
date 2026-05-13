import { useEffect, useRef, useState } from 'react';

import { getCharacterById } from '@/shared/api';

import type { TCharacter, TLoadStatus } from '../types';

export const useCharacterById = (id: number) => {
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [status, setStatus] = useState<TLoadStatus>('loading');

  const abortRef = useRef<AbortController | null>(null);

  const isInvalidId = !id || isNaN(id);

  useEffect(() => {
    if (isInvalidId) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchCharacter = async () => {
      setStatus('loading');

      try {
        const { data } = await getCharacterById(id, controller.signal);
        if (!controller.signal.aborted) {
          setCharacter(data);
          setStatus('success');
        }
      } catch {
        if (!controller.signal.aborted) {
          setStatus('error');
        }
      }
    };

    fetchCharacter();

    return () => controller.abort();
  }, [id]);

  return {
    character: isInvalidId ? null : character,
    isLoading: status === 'loading',
    isError: status === 'error'
  };
};
