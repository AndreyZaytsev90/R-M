import { useCallback, useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components';
import { FILTERS_DEBOUNCE_DELAY } from '@/shared/constants';
import { useDebounce } from '@/shared/hooks';
import { useInfiniteCharacters } from '@/shared/hooks/useInfiniteCharacters';
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
    characters,
    visibleCharacters,
    visibleCount,
    isLoading,
    isLoadMore,
    isError,
    onLoadMore,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    updateCharacter
  } = useInfiniteCharacters(debouncedFilters);

  const handleFilterChange = useCallback(
    (type: TFilterType, value: string | null) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    },
    []
  );

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, name: value }));
  }, []);

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
            <CharacterCard
              key={character.id}
              character={character}
              onUpdate={updateCharacter}
            />
          ))}
        </section>
      )}

      {isLoading && <Loading size='small' />}

      <InfiniteScrollSentinel
        totalCount={characters.length}
        visibleCount={visibleCount}
        onLoadMore={onLoadMore}
        isLoadMore={isLoadMore}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
};
