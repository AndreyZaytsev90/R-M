import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import axios from 'axios';

import { getCharacters } from '@/shared/api';
import type { TCharactersResponse } from '@/shared/types';

type IFilterParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
};

export const useCharacters = (filters: IFilterParams = {}) => {
  const [characters, setCharacters] = useState<TCharactersResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      try {
        setIsLoading(true);

        const data = await getCharacters(controller.signal, filters);
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
        if (axios.isCancel(error)) return;
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

    const timer = setTimeout(() => {
      loadCharacters();
    }, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filters]);

  return { characters, isLoading, hasError, isEmpty };
};
