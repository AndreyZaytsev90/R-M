import Icon from '../../../assets/Layer 1.svg';
import Sun from '../../../assets/sun 1.svg';
import LangRu from '../../../assets/РУ.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles['header_header-icon']}>
      <Icon />
      <div className={styles['header_header-buttons']}>
        <button className={styles['header_header-buttons__button-theme']}>
          <Sun />
        </button>
        <button className={styles['header_header-buttons__button-lang']}>
          <LangRu />
        </button>
      </div>
    </div>
  );
};
