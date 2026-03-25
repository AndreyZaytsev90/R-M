import { useState } from 'react';

import { IconSearch, logoRickAndMorty } from '@/assets';
import { Input, Loading, Select, StatusOption } from '@/shared/components';
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';
import { type TStatus } from '@/shared/types';
import { CharacterCard, type TCharacter } from '@/widgets/CharacterCard';

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
    gender: 'male',
    species: 'Human',
    location: 'Earth (C-137)',
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
          icon={<IconSearch />}
        />
        <Input value={underlinedValue} onChange={setUnderlinedValue} variant='underlined' />
      </div>
      <img src={logoRickAndMorty} alt='Rick and Morty' width={600} height={200} />
      <div>
        <CharacterCard character={character} />
        <Loading label='Loading characters...' size='large' />
      </div>
    </main>
  );
};
