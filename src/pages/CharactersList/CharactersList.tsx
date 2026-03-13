import { useState } from 'react';

import { IconSearch, LogoRickAndMorty } from '@/assets';
import { Input, Loading, Select, StatusOption, type TStatus } from '@/shared';

import styles from './CharactersList.module.css';

type TStatusOption = { label: string; value: TStatus };

const OPTIONS_LARGE_LIST = [
  { label: 'human', value: 'Human' },
  { label: 'alien', value: 'Alien' },
  { label: 'humanoid', value: 'Humanoid' },
  { label: 'animal', value: 'Animal' },
  { label: 'robot', value: 'Robot' }
];

const OPTIONS_SMALL_LIST: TStatusOption[] = [
  { label: 'alive', value: 'Alive' },
  { label: 'dead', value: 'Dead' },
  { label: 'unknown', value: 'Unknown' }
];

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<TStatus | null>('Alive');
  const [borderedValue, setBorderedValue] = useState<string>('');
  const [underlinedValue, setUnderlinedValue] = useState<string>('');

  const handleChangeLarge = (value: string | null) => setLargeValue(value);
  const handleChangeSmall = (value: TStatus | null) => setSmallValue(value);

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
