import { IconLangRus, IconLightTheme, IconMain } from '@/assets';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <IconMain />
      <div className={styles.header__buttons}>
        <button className={styles.header__button}>
          <IconLightTheme />
        </button>
        <button className={styles.header__button}>
          <IconLangRus />
        </button>
      </div>
    </header>
  );
};
