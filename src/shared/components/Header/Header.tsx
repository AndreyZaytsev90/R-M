import { LangRusIcon, LightThemeIcon, MainIcon } from '@/assets';
import { Button } from '@/shared/components';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <MainIcon />
      <div className={styles.header__buttons}>
        <Button className={styles.header__button} variant='primary'>
          <LightThemeIcon />
        </Button>
        <Button className={styles.header__button} variant='primary'>
          <LangRusIcon />
        </Button>
      </div>
    </header>
  );
};
