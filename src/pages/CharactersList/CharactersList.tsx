import { useState } from 'react';

import { IconAliveStatus, IconDeadStatus, IconUnknownStatus, LogoRickAndMorty } from '@/assets';
import { Loading } from '@/shared';
import { Select } from '@/shared/components/Select/Select';

import styles from './CharactersList.module.css';

type Status = 'Alive' | 'Dead' | 'Unknown';

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<string | null>('Alive');

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

  const STATUS_ICONS: Record<Status, React.ReactNode> = {
    Alive: <IconAliveStatus />,
    Dead: <IconDeadStatus />,
    Unknown: <IconUnknownStatus />
  };

  const StatusOption = ({ option }: { option: { value: string } }) => (
    <span>
      {option.value} {STATUS_ICONS[option.value as Status]}
    </span>
  );

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
          OptionsComponent={StatusOption}
        />
      </div>
      <LogoRickAndMorty />
      <section>
        <Loading label='Loading characters...' size='large' />
      </section>
    </main>
  );
};
