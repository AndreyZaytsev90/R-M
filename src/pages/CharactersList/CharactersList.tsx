import { Loading } from '@/shared';
import styles from './CharactersList.module.css';
import { LogoRickAndMorty } from '@/assets';
import { useState } from 'react';
import { Select } from '@/shared/components/Select/Select';

export const CharactersList = () => {
  const [value, setValue] = useState('');

  const handleChange = (newValue: string) => setValue(newValue);

  const optionsList = [
    { label: 'human', value: 'Human' },
    { label: 'alien', value: 'Alien' },
    { label: 'humanoid', value: 'Humanoid' },
    { label: 'animal', value: 'Animal' },
    { label: 'robot', value: 'Robot' }
  ];

  return (
    <main className={styles.container}>
      <Select options={optionsList} placeholder={'Species'} value={value} onChange={handleChange} size={'large'} />
      <LogoRickAndMorty />
      <section>
        <Loading label='Loading characters...' size='large' />
      </section>
    </main>
  );
};
