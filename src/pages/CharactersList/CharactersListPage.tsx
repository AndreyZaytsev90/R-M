import { useState } from 'react';

import { RickAndMortyIcon, SearchIcon } from '@/assets';
import { Input, Loading, Select } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';
import { type TCharacter, type TFilterType } from '@/shared/types';
import { CharacterCard } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const [borderedValue, setBorderedValue] = useState<string>('');

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    switch (type) {
      case 'species':
        setSelectedSpecies(value);
        break;
      case 'gender':
        setSelectedGender(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
    }
  };

  const character: TCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'alive'
  };

  return (
    <main className={styles.container}>
      <img
        src={RickAndMortyIcon}
        alt='Rick and Morty'
        width={600}
        height={200}
      />
      <div className={styles.selects}>
        <Input
          placeholder='Filter by name...'
          value={borderedValue}
          onChange={setBorderedValue}
          variant='bordered'
          icon={<SearchIcon />}
        />
        <Select
          options={SPECIES_OPTIONS}
          placeholder='Species'
          value={selectedSpecies}
          onChange={(value) => handleFilterChange('species', value)}
          size='large'
        />
        <Select
          options={GENDER_OPTIONS}
          placeholder='Gender'
          value={selectedGender}
          onChange={(value) => handleFilterChange('gender', value)}
          size='large'
        />
        <Select
          options={STATUS_OPTIONS}
          placeholder='Status'
          value={selectedStatus}
          onChange={(value) => handleFilterChange('status', value)}
          size='large'
        />
      </div>

      <div className={styles.cardList}>
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
      </div>
      <Loading size='small' />
    </main>
  );
};
