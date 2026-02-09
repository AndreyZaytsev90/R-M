import MainIcon from '../../../assets/Layer 1.svg';
import IconThemeSun from '../../../assets/sun 1.svg';
import IconLangRu from '../../../assets/РУ.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles['header']}>
      <MainIcon />
      <div className={styles['header__buttons']}>
        <button className={styles['header__button']}>
          <IconThemeSun />
        </button>
        <button className={styles['header__button']}>
          <IconLangRu />
        </button>
      </div>
    </header>
  );
};
