import { useNavigate } from 'react-router';

import { NotFound } from '@/assets/images';
import { Button } from '@/shared/components';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('/');

  return (
    <main className={styles.container}>
      <img src={NotFound} alt='Rick and Morty' width={544} height={333} />
      <Button className={styles.button} onClick={goBack}>
        <span>Go to main page</span>
      </Button>
    </main>
  );
};
