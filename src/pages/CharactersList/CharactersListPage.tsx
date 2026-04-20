import { useMemo, useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components/InfiniteScrollSentinel/InfiniteScrollSentinel';
import { FILTERS_DEBOUNCE_DELAY } from '@/shared/constants/debounce';
import { VISIBLE_PAGE_SIZE } from '@/shared/constants/pagination';
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
    setVisibleCount((prev) =>
      Math.min(prev + VISIBLE_PAGE_SIZE, characters.length)
    );
  };

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
        <section className={styles.cardList}>
          {visibleCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </section>
      )}
      {(isLoading || isFetchingNextPage) && <Loading size='small' />}
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
