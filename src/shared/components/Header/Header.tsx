import iconRandM from '../../../assets/Layer 1.svg';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles['header_header-icon']}>
      <img src={iconRandM} alt='Иконка' />
    </div>
  );
};
