import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getCharacters } from '@/shared/api';
import { DEBOUNCE_DELAY, VISIBLE_PAGE_SIZE } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getNextPageFromUrl } from '@/shared/lib';
import type { IFilterParams, TCharacter } from '@/shared/types';
import {
  addCharacters,
  resetCharacters,
  setCharacters,
  setNextPage,
  setStatus
} from '@/stores/slices/characters';

export const useInfiniteCharacters = (filters: IFilterParams) => {
  const dispatch = useAppDispatch();
  const { characters, status, nextPage } = useAppSelector(
    (state) => state.characters
  );
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    dispatch(resetCharacters());
    setVisibleCount(VISIBLE_PAGE_SIZE);
    //dispatch(setNextPage(2));
    dispatch(setStatus('loading'));

    const loadCharacters = async () => {
      try {
        const { data } = await getCharacters(controller.signal, {
          ...filters,
          page: 1
        });

        if (controller.signal.aborted) return;

        dispatch(setCharacters(data.results));

        const next = getNextPageFromUrl(data.info.next);
        dispatch(setNextPage(next));

        dispatch(setStatus('success'));
      } catch {
        dispatch(setStatus('error'));
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [filters, dispatch]);

  const isFetchingRef = useRef(false);

  const fetchNextPage = useCallback(async () => {
    if (!nextPage || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsFetchingNextPage(true);
    dispatch(setStatus('loading'));

    try {
      const { data } = await getCharacters(undefined, {
        ...filters,
        page: nextPage
      });
      dispatch(addCharacters(data.results));

      const next = getNextPageFromUrl(data.info.next);
      dispatch(setNextPage(next));

      dispatch(setStatus('success'));
    } catch {
      dispatch(setStatus('error'));
    } finally {
      isFetchingRef.current = false;
      setIsFetchingNextPage(false);
    }
  }, [nextPage, filters, dispatch]);

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
      const updatedList = characters.map((char) =>
        char.id === id ? { ...char, ...updated } : char
      );
      dispatch(setCharacters(updatedList));
    },
    [characters, dispatch]
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
