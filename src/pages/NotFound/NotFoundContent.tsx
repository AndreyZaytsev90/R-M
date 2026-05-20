import { useNavigate } from 'react-router';

import { NotFound } from '@/assets/images';
import { Button } from '@/shared/components';

import styles from './NotFoundPage.module.scss';

export const NotFoundContent = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  return (
    <div className={styles.content}>
      <img src={NotFound} alt='Rick and Morty' width={544} height={333} />
      <Button className={styles.button} onClick={handleGoHome}>
        <span>Go to main page</span>
      </Button>
    </div>
  );
};
