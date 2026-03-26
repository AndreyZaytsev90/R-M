import { useState } from 'react';

import { RickAndMortyIcon, SearchIcon } from '@/assets';
import { Input, Loading, Select, StatusOption } from '@/shared/components';
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';
import { type TCharacter, type TStatus } from '@/shared/types';
import { CharacterCard } from '@/widgets/CharacterCard';

import styles from './CharactersListPage.module.css';

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<TStatus | null>('alive');
  const [borderedValue, setBorderedValue] = useState<string>('');
  const [underlinedValue, setUnderlinedValue] = useState<string>('');

  const handleChangeLarge = (value: string | null) => setLargeValue(value);
  const handleChangeSmall = (value: TStatus | null) => setSmallValue(value);

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
      <div className={styles.selects}>
        <Select
          options={SPECIES_OPTIONS}
          placeholder='Species'
          value={largeValue}
          onChange={handleChangeLarge}
          size='large'
        />
        <Select
          options={STATUS_OPTIONS}
          value={smallValue}
          placeholder='Alive'
          onChange={handleChangeSmall}
          size='small'
          OptionsComponent={StatusOption}
        />
        <Input
          placeholder='Filter by name...'
          value={borderedValue}
          onChange={setBorderedValue}
          variant='bordered'
          icon={<SearchIcon />}
        />
        <Input value={underlinedValue} onChange={setUnderlinedValue} variant='underlined' />
      </div>
      <img src={RickAndMortyIcon} alt='Rick and Morty' width={600} height={200} />
      <div>
        <CharacterCard character={character} />
        <Loading label='Loading characters...' size='large' />
      </div>
    </main>
  );
};
