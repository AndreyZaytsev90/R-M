import { Loading } from '@/shared';
import styles from './CharactersList.module.css';
import { IconAliveStatus, IconDeadStatus, IconUnknownStatus, LogoRickAndMorty } from '@/assets';
import { useState } from 'react';
import { Select } from '@/shared/components/Select/Select';

type Status = 'Alive' | 'Dead' | 'Unknown';

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<string | null>(null);

  const handleChangeLarge = (newValue: string | null) => setLargeValue(newValue);
  const handleChangeSmall = (newValue: string | null) => setSmallValue(newValue);

  const optionsLargeList = [
    { label: 'human', value: 'Human' },
    { label: 'alien', value: 'Alien' },
    { label: 'humanoid', value: 'Humanoid' },
    { label: 'animal', value: 'Animal' },
    { label: 'robot', value: 'Robot' }
  ];

  const optionsSmallList = [
    { label: 'alive', value: 'Alive' },
    { label: 'dead', value: 'Dead' },
    { label: 'unknown', value: 'Unknown' }
  ];

  return (
    <main className={styles.container}>
      <div className={styles.selects}>
        <Select
          options={optionsLargeList}
          placeholder={'Species'}
          value={largeValue}
          onChange={handleChangeLarge}
          size={'large'}
          OptionsComponent={({ option }) => <span>{option.value}</span>}
        />
        <Select
          options={optionsSmallList}
          placeholder={'Alive'}
          value={smallValue}
          onChange={handleChangeSmall}
          size={'small'}
          OptionsComponent={({ option }) => (
            <span>
              {option.value === 'Alive' ? (
                <>
                  {option.value} <IconAliveStatus />
                </>
              ) : option.value === 'Dead' ? (
                <>
                  {option.value} <IconDeadStatus />
                </>
              ) : (
                <>
                  {option.value} <IconUnknownStatus />
                </>
              )}
            </span>
          )}
        />
      </div>
      <LogoRickAndMorty />
      <section>
        <Loading label='Loading characters...' size='large' />
      </section>
    </main>
  );
};
