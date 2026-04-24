import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@/shared/api';

import { DEBOUNCE_DELAY, VISIBLE_PAGE_SIZE } from '../constants';
import type { TCharacter } from '../types';

type IFilterParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
};

type TLoadStatus = 'idle' | 'loading' | 'error' | 'success';

export const useInfiniteCharacters = (filters: IFilterParams = {}) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);
  const [status, setStatus] = useState<TLoadStatus>('idle');
  const [nextPage, setNextPage] = useState<number | undefined>(2);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadMoreRef = useRef(false);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setCharacters([]);
    setVisibleCount(VISIBLE_PAGE_SIZE);
    setNextPage(2);
    setStatus('loading');

    const loadCharacters = async () => {
      try {
        const data = await getCharacters(controller.signal, {
          ...filters,
          page: 1
        });

        if (controller.signal.aborted) return;

        setCharacters(data.results);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [filters]);

  const fetchNextPage = useCallback(async () => {
    if (!nextPage || isFetchingNextPage) return;

    setIsFetchingNextPage(true);

    try {
      const data = await getCharacters(undefined, {
        ...filters,
        page: nextPage
      });
      setCharacters((prev) => [...prev, ...data.results]);
      setNextPage(nextPage + 1);
    } catch {
      setStatus('error');
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [nextPage, isFetchingNextPage, filters]);

  useEffect(() => {
    if (!isLoadMoreRef.current) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + VISIBLE_PAGE_SIZE, characters.length)
      );
      isLoadMoreRef.current = false;
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [characters.length]);

  const onLoadMore = () => {
    if (!isLoadMoreRef.current) {
      isLoadMoreRef.current = true;
    }
  };

  return {
    characters,
    visibleCharacters: characters.slice(0, visibleCount),
    visibleCount,
    isLoading: status === 'loading',
    isError: status === 'error',
    isLoadMore: isLoadMoreRef.current,
    onLoadMore,
    fetchNextPage,
    hasNextPage: nextPage !== undefined,
    isFetchingNextPage
  };
};
