import MainIcon from '../../../assets/Layer 1.svg';
import IconThemeSun from '../../../assets/sun 1.svg';
import IconLangRu from '../../../assets/РУ.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <MainIcon />
      <div className={styles.headerButtons}>
        <button className={styles.headerButton}>
          <IconThemeSun />
        </button>
        <button className={styles.headerButton}>
          <IconLangRu />
        </button>
      </div>
    </header>
  );
};
