import { useNavigate } from 'react-router';

import { IconGoBack } from '@/assets';
import { Loading } from '@/shared';

import styles from './CharacterCard.module.css';

export const CharacterCard = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <button className={styles.button} onClick={() => navigate('/')}>
        <IconGoBack />
        <span className={styles.buttonText}>GO BACK</span>
      </button>
      <section className={styles.loading}>
        <Loading label='Loading character card...' size='large' />
        <Loading label='Loading character card...' size='small' />
      </section>
    </main>
  );
};
