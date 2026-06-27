import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useGetCharactersQuery } from '@/shared/api/apiSlice';
import { DEBOUNCE_DELAY, VISIBLE_PAGE_SIZE } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import type { IFilterParams, TCharacter } from '@/shared/types';
import {
  addUniqueCharacters,
  clearCharacters,
  setCurrentPage,
  setVisibleCount
} from '@/stores/slices/characters';

export const useInfiniteCharacters = (filters: IFilterParams) => {
  const dispatch = useAppDispatch();

  const { accumulatedCharacters, currentPage, visibleCount } = useAppSelector(
    (state) => state.characters,
    shallowEqual
  );

  const [isLoadMore, setIsLoadMore] = useState(false);

  const { data, isLoading, isError, isFetching } = useGetCharactersQuery({
    ...filters,
    page: currentPage
  });

  const filtersString = JSON.stringify(filters);
  const prevFiltersStringRef = useRef(filtersString);

  useEffect(() => {
    if (prevFiltersStringRef.current !== filtersString) {
      dispatch(clearCharacters());
      prevFiltersStringRef.current = filtersString;
    }
  }, [dispatch, filtersString]);

  useEffect(() => {
    if (!data?.results) return;
    dispatch(addUniqueCharacters(data.results));
  }, [data?.results, dispatch]);

  const isFetchingRef = useRef(false);

  const fetchNextPage = useCallback(async () => {
    if (!data?.info?.next || isFetchingRef.current) return;
    isFetchingRef.current = true;
    dispatch(setCurrentPage(currentPage + 1));
  }, [data?.info?.next, currentPage, dispatch]);

  useEffect(() => {
    if (!isFetching) {
      isFetchingRef.current = false;
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isLoadMore) return;
    const timer = setTimeout(() => {
      dispatch(
        setVisibleCount(
          Math.min(
            visibleCount + VISIBLE_PAGE_SIZE,
            accumulatedCharacters.length
          )
        )
      );
      setIsLoadMore(false);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [isLoadMore, accumulatedCharacters.length, visibleCount, dispatch]);

  const onLoadMore = useCallback(() => setIsLoadMore(true), []);

  const updateCharacter = useCallback(
    (id: number, updated: Partial<TCharacter>) => {
      dispatch(
        addUniqueCharacters(
          accumulatedCharacters.map((c) =>
            c.id === id ? { ...c, ...updated } : c
          )
        )
      );
    },
    [accumulatedCharacters, dispatch]
  );

  const visibleCharacters = useMemo(
    () => accumulatedCharacters.slice(0, visibleCount),
    [accumulatedCharacters, visibleCount]
  );

  return {
    characters: accumulatedCharacters,
    visibleCharacters,
    visibleCount,
    isLoading,
    isError,
    isLoadMore,
    onLoadMore,
    fetchNextPage,
    hasNextPage: !!data?.info?.next,
    isFetchingNextPage: isFetching,
    updateCharacter
  };
};
