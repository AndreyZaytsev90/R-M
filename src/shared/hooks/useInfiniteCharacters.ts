import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getCharacters } from '@/shared/api';

import { DEBOUNCE_DELAY, VISIBLE_PAGE_SIZE } from '../constants';
import type { IFilterParams, TCharacter, TLoadStatus } from '../types';

export const useInfiniteCharacters = (filters: IFilterParams) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);
  const [status, setStatus] = useState<TLoadStatus>('idle');
  const [nextPage, setNextPage] = useState<number | undefined>(2);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

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
        const { data } = await getCharacters(controller.signal, {
          ...filters,
          page: 1
        });

        if (controller.signal.aborted) return;

        setCharacters(data.results);
        setNextPage(data.info.next ? 2 : undefined);
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
      const { data } = await getCharacters(undefined, {
        ...filters,
        page: nextPage
      });
      setCharacters((prev) => [...prev, ...data.results]);
      setNextPage(data.info.next ? nextPage + 1 : undefined);
    } catch {
      setStatus('error');
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [nextPage, isFetchingNextPage, filters]);

  useEffect(() => {
    if (!isLoadMore) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + VISIBLE_PAGE_SIZE, characters.length)
      );
      setIsLoadMore(false);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [isLoadMore, characters.length]);

  const onLoadMore = useCallback(() => setIsLoadMore(true), []);

  const updateCharacter = useCallback(
    (id: number, updated: Partial<TCharacter>) => {
      setCharacters((prev) =>
        prev.map((char) => (char.id === id ? { ...char, ...updated } : char))
      );
    },
    []
  );

  const visibleCharacters = useMemo(
    () => characters.slice(0, visibleCount),
    [characters, visibleCount]
  );

  return {
    characters,
    visibleCharacters,
    visibleCount,
    isLoading: status === 'loading',
    isError: status === 'error',
    isLoadMore,
    onLoadMore,
    fetchNextPage,
    hasNextPage: nextPage !== undefined,
    isFetchingNextPage,
    updateCharacter
  };
};
