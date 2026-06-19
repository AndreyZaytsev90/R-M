import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components';
import { FILTERS_DEBOUNCE_DELAY } from '@/shared/constants/debounce';
import { useDebounce, useInfiniteCharacters } from '@/shared/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useAppHooks';
import type { TFilterType } from '@/shared/types';
import {
  setGender,
  setName,
  setSpecies,
  setStatus
} from '@/stores/slices/charactersFilters';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.charactersFilters);

  const [debouncedFilters, isPending] = useDebounce(
    filters,
    FILTERS_DEBOUNCE_DELAY
  );

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

  const handleSearchChange = (value: string) => {
    dispatch(setName(value || null));
  };

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    switch (type) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'species':
        dispatch(setSpecies(value));
        break;
      case 'gender':
        dispatch(setGender(value));
        break;
      case 'status':
        dispatch(setStatus(value));
        break;
    }
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

      {isPending && <Loading size='small' />}

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

      {isLoading && <Loading size='large' />}

      {!isLoading && (
        <InfiniteScrollSentinel
          totalCount={characters.length}
          visibleCount={visibleCount}
          onLoadMore={onLoadMore}
          isLoadMore={isLoadMore}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </main>
  );
};
