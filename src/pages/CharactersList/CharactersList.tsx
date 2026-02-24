import { useState } from 'react';

import { LogoRickAndMorty } from '@/assets';
import { Loading, Select, type Status, StatusOption } from '@/shared';

import styles from './CharactersList.module.css';

type StatusOptionType = { label: string; value: Status };

const OPTIONS_LARGE_LIST = [
  { label: 'human', value: 'Human' },
  { label: 'alien', value: 'Alien' },
  { label: 'humanoid', value: 'Humanoid' },
  { label: 'animal', value: 'Animal' },
  { label: 'robot', value: 'Robot' }
];

const OPTIONS_SMALL_LIST: StatusOptionType[] = [
  { label: 'alive', value: 'Alive' },
  { label: 'dead', value: 'Dead' },
  { label: 'unknown', value: 'Unknown' }
];

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<Status | null>('Alive');

  const handleChangeLarge = (value: string | null) => setLargeValue(value);
  const handleChangeSmall = (value: Status | null) => setSmallValue(value);

  return (
    <main className={styles.container}>
      <div className={styles.selects}>
        <Select
          options={OPTIONS_LARGE_LIST}
          placeholder='Species'
          value={largeValue}
          onChange={handleChangeLarge}
          size='large'
        />
        <Select
          options={OPTIONS_SMALL_LIST}
          value={smallValue}
          defaultValue='Alive'
          placeholder='Alive'
          onChange={handleChangeSmall}
          size='small'
          OptionsComponent={StatusOption}
        />
      </div>
      <img src={LogoRickAndMorty} alt='Rick and Morty' />
      <section>
        <Loading label='Loading characters...' size='large' />
      </section>
    </main>
  );
};
