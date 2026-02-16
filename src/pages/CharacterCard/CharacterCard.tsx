import { useNavigate } from 'react-router';
import styles from './CharacterCard.module.css';
import { Loading } from '@/shared';
import { IconGoBack } from '@/assets';
import { Select } from '@/shared/components/Select/Select';
import { useState } from 'react';

export const CharacterCard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const optionsList = [
    { label: 'human', value: 'Human' },
    { label: 'alien', value: 'Alien' },
    { label: 'humanoid', value: 'Humanoid' },
    { label: 'animal', value: 'Animal' },
    { label: 'robot', value: 'Robot' }
  ];

  return (
    <main className={styles.container}>
      <button className={styles.button} onClick={() => navigate('/')}>
        <IconGoBack />
        <span className={styles.buttonText}>GO BACK</span>
      </button>
      <section className={styles.loading}>
        <Loading label='Loading character card...' size='large' />
        <Loading label='Loading character card...' size='small' />
        <Select options={optionsList} placeholder={'Species'} value={value} onChange={setValue} size={'large'} />
      </section>
    </main>
  );
};
