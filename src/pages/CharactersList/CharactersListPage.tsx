import { useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components';
import { FILTERS_DEBOUNCE_DELAY } from '@/shared/constants';
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

  const debouncedFilters = useDebounce(filters, FILTERS_DEBOUNCE_DELAY);

  const {
    visibleCharacters,
    characters,
    isLoading,
    isError,
    isLoadMore,
    visibleCount,
    onLoadMore,
    resetVisible,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteCharacters(debouncedFilters);

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    resetVisible();
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('name', value);
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
        <>
          <section className={styles.cardList}>
            {visibleCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </section>
        </>
      )}

      {isLoading && <Loading size='small' />}

      <InfiniteScrollSentinel
        visibleCount={visibleCount}
        totalCount={characters.length}
        isLoadMore={isLoadMore}
        onLoadMore={onLoadMore}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
};
