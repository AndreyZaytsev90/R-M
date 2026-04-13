import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import axios from 'axios';

import { getCharacters } from '@/shared/api';
import type { TCharactersResponse } from '@/shared/types';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<TCharactersResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters();
        if (data) {
          setCharacters(data);
          setHasError(false);
          const isEmptyResult = !data.results || data.results.length === 0;
          setIsEmpty(isEmptyResult);
          if (isEmptyResult) {
            toast.error('No characters found');
          }
        }
      } catch (error) {
        let message = 'Failed to load character list';

        if (axios.isAxiosError(error)) {
          if (error.response) {
            message = error.response.data?.message ?? message;
          }
        } else if (error instanceof Error) {
          message = error.message;
        }
        setHasError(true);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacters();
  }, []);

  return { characters, isLoading, hasError, isEmpty };
};
