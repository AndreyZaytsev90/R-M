import BigLoadingIcon from '../../../assets/Loading component 1.svg';
import styles from './Loading.module.css';

interface LoadingProps {
  label?: string;
}

export const Loading = ({ label }: LoadingProps) => {
  return (
    <div className={styles['loading-icon']}>
      <BigLoadingIcon className={styles['loading-icon__spinner']} />
      {label && <p className={styles['loading-icon__text']}>{label}</p>}
    </div>
  );
};
