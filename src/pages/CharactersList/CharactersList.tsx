import { useState } from 'react';

import { IconSearch, LogoRickAndMorty } from '@/assets';
import { Input, Loading, Select, type Status, StatusOption } from '@/shared';

import styles from './CharactersList.module.css';

type StatusOptionType = { label: string; value: Status };

const OPTIONS_LARGE_LIST = [
  { label: 'Human', value: 'human' },
  { label: 'Alien', value: 'alien' },
  { label: 'Humanoid', value: 'humanoid' },
  { label: 'Animal', value: 'animal' },
  { label: 'Robot', value: 'robot' }
];

const OPTIONS_SMALL_LIST: StatusOptionType[] = [
  { label: 'alive', value: 'Alive' },
  { label: 'dead', value: 'Dead' },
  { label: 'unknown', value: 'Unknown' }
];

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<Status | null>('Alive');

  const [borderedValue, setBorderedValue] = useState('');
  const [underlinedValue, setUnderlinedValue] = useState('');

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
      <img src={LogoRickAndMorty} alt='Logo Rick and Morty' width={600} height={200} />
      <div>
        <Loading label='Loading characters...' size='large' />
      </div>
    </main>
  );
};
