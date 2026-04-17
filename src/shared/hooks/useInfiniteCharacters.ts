import { useInfiniteQuery } from '@tanstack/react-query';

import { getCharacters } from '@/shared/api';

type IFilterParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
};

export const useInfiniteCharacters = (filters: IFilterParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['characters', filters], // при смене filters — сбросит всё и начнёт заново

    queryFn: ({ signal, pageParam }) =>
      getCharacters(signal, { ...filters, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined; // страниц больше нет → стоп

      const url = new URL(lastPage.info.next);
      const page = url.searchParams.get('page');

      return page ? Number(page) : undefined;
    }
  });
};
