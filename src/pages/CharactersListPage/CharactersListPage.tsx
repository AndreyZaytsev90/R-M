import { shallowEqual } from 'react-redux';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { InfiniteScrollSentinel } from '@/shared/components';
import { FILTERS_DEBOUNCE_DELAY } from '@/shared/constants';
import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useInfiniteCharacters
} from '@/shared/hooks';
import type { TFilterType } from '@/shared/types';
import {
  setFilterGender,
  setFilterName,
  setFilterSpecies,
  setFilterStatus
} from '@/stores/slices/characters';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state) => state.characters.filters,
    shallowEqual
  );

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
    dispatch(setFilterName(value || null));
  };

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    switch (type) {
      case 'name':
        dispatch(setFilterName(value));
        break;
      case 'species':
        dispatch(setFilterSpecies(value));
        break;
      case 'gender':
        dispatch(setFilterGender(value));
        break;
      case 'status':
        dispatch(setFilterStatus(value));
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
