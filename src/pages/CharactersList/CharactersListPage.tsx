import { useEffect, useMemo, useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components/InfiniteScrollSentinel/InfiniteScrollSentinel';
import {
  DEBOUNCE_DELAY,
  FILTERS_DEBOUNCE_DELAY,
  VISIBLE_PAGE_SIZE
} from '@/shared/constants';
import { useDebounce, useInfiniteCharacters } from '@/shared/hooks';
import type { TFilterType } from '@/shared/types';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const [filters, setFilters] = useState<Record<TFilterType, string | null>>({
    name: null,
    species: null,
    gender: null,
    status: null
  });
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const debouncedFilters = useDebounce(filters, FILTERS_DEBOUNCE_DELAY);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteCharacters(debouncedFilters);

  const characters = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const visibleCharacters = characters.slice(0, visibleCount);

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setVisibleCount(VISIBLE_PAGE_SIZE);
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('name', value);
  };

  const onLoadMoreHandler = () => {
    setIsLoadMore(true);
  };

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

  return (
    <main className={styles.container}>
      <img
        src={RickAndMortyIcon}
        alt='Rick and Morty'
        width={600}
        height={200}
      />
      <CharacterFilterPanel
        filters={filters}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      {!isError && characters.length > 0 && (
        <>
          <section className={styles.cardList}>
            {visibleCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </section>

          {isLoadMore && (
            <div className={styles.loadingContainer}>
              <Loading size='small' />
            </div>
          )}
        </>
      )}

      {isLoading && <Loading size='small' />}

      <InfiniteScrollSentinel
        visibleCount={visibleCount}
        totalCount={characters.length}
        onLoadMore={onLoadMoreHandler}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
};
