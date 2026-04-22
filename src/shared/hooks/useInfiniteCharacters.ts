import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getCharacters } from '@/shared/api';

import { DEBOUNCE_DELAY, VISIBLE_PAGE_SIZE } from '../constants';

type IFilterParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
};

export const useInfiniteCharacters = (filters: IFilterParams = {}) => {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const query = useInfiniteQuery({
    queryKey: ['characters', filters],

    queryFn: ({ signal, pageParam }) =>
      getCharacters(signal, { ...filters, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;

      const url = new URL(lastPage.info.next);
      const page = url.searchParams.get('page');

      return page ? Number(page) : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.results)
  });

  const characters = query.data ?? [];

  useEffect(() => {
    if (isLoadMore) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) =>
          Math.min(prev + VISIBLE_PAGE_SIZE, characters.length)
        );
        setIsLoadMore(false);
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isLoadMore, characters.length]);

  const onLoadMore = () => setIsLoadMore(true);

  const resetVisible = () => setVisibleCount(VISIBLE_PAGE_SIZE);

  return {
    ...query,
    characters,
    visibleCharacters: characters.slice(0, visibleCount),
    visibleCount,
    isLoadMore,
    onLoadMore,
    resetVisible
  };
};
