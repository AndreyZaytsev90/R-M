import { useEffect, useState } from 'react';

import { getCharacterById } from '@/shared/api';

import type { TCharacter, TLoadStatus } from '../types';

export const useCharacterById = (id: number) => {
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [status, setStatus] = useState<TLoadStatus>('loading');

  const isInvalidId = !id || isNaN(id);

  useEffect(() => {
    if (isInvalidId) return;

    const controller = new AbortController();

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
  }, [id, isInvalidId]);

  return {
    character: isInvalidId ? null : character,
    isLoading: status === 'loading',
    isError: status === 'error'
  };
};
