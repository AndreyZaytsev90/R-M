import MainIcon from '@/assets/images/mainIcon.svg';
import IconLightTheme from '@/assets/images/iconLightTheme.svg';
import IconLangRus from '@/assets/images/iconLangRus.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <MainIcon />
      <div className={styles.headerButtons}>
        <button className={styles.headerButton}>
          <IconLightTheme />
        </button>
        <button className={styles.headerButton}>
          <IconLangRus />
        </button>
      </div>
    </header>
  );
};
