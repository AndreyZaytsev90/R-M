import { useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import type { TFilterType } from '@/shared/types';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import { useCharacters } from '../../shared/hooks/useCharacters';
import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const [filters, setFilters] = useState<Record<TFilterType, string | null>>({
    name: null,
    species: null,
    gender: null,
    status: null
  });
  const { characters, isLoading, hasError, isEmpty } = useCharacters(filters);

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, name: value }));
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
      {!hasError && characters && !isEmpty && (
        <section className={styles.cardList}>
          {characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </section>
      )}
      {isLoading && <Loading size='small' />}
    </main>
  );
};
