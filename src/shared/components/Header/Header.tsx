import { LangRusIcon, LightThemeIcon, MainIcon } from '@/assets';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <MainIcon />
      <div className={styles.header__buttons}>
        <button className={styles.header__button}>
          <LightThemeIcon />
        </button>
        <button className={styles.header__button}>
          <LangRusIcon />
        </button>
      </div>
    </header>
  );
};
