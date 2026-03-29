import { useNavigate } from 'react-router';

import { GoBackIcon } from '@/assets';
import { Button, Loading } from '@/shared/components';

import styles from './CharacterCardPage.module.scss';

export const CharacterCardPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate('/');

  return (
    <main className={styles.container}>
      <Button className={styles.button} onClick={goBack}>
        <GoBackIcon />
        <span className={styles.buttonText}>GO BACK</span>
      </Button>
      <section className={styles.loading}>
        <Loading label='Loading character card...' size='large' />
        <Loading label='Loading character card...' size='small' />
      </section>
    </main>
  );
};
