import { useState } from 'react';

import { IconAliveStatus, IconDeadStatus, IconUnknownStatus, LogoRickAndMorty } from '@/assets';
import { Loading, Select } from '@/shared';

import styles from './CharactersList.module.css';

type Status = 'Alive' | 'Dead' | 'Unknown';
type StatusOption = { label: string; value: Status };

export const CharactersList = () => {
  const [largeValue, setLargeValue] = useState<string | null>(null);
  const [smallValue, setSmallValue] = useState<Status | null>('Alive');

  const handleChangeLarge = (newValue: string | null) => setLargeValue(newValue);
  const handleChangeSmall = (newValue: Status | null) => setSmallValue(newValue);

  const optionsLargeList = [
    { label: 'human', value: 'Human' },
    { label: 'alien', value: 'Alien' },
    { label: 'humanoid', value: 'Humanoid' },
    { label: 'animal', value: 'Animal' },
    { label: 'robot', value: 'Robot' }
  ];

  const optionsSmallList: StatusOption[] = [
    { label: 'alive', value: 'Alive' },
    { label: 'dead', value: 'Dead' },
    { label: 'unknown', value: 'Unknown' }
  ];

  const STATUS_ICONS: Record<Status, React.ReactNode> = {
    Alive: <IconAliveStatus />,
    Dead: <IconDeadStatus />,
    Unknown: <IconUnknownStatus />
  };

  const StatusOption = ({ option }: { option: StatusOption }) => (
    <span>
      {option.value} {STATUS_ICONS[option.value]}
    </span>
  );

  return (
    <main className={styles.container}>
      <div className={styles.selects}>
        <Select
          options={optionsLargeList}
          placeholder='Species'
          value={largeValue}
          onChange={handleChangeLarge}
          size='large'
        />
        <Select
          options={optionsSmallList}
          value={smallValue}
          defaultValue='Alive'
          placeholder='Alive'
          onChange={handleChangeSmall}
          size='small'
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
