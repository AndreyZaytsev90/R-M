import LargeLoadingIcon from '../../../assets/Loading component 1.svg';
import SmallLoadingIcon from '../../../assets/Loading component little.svg';
import styles from './Loading.module.css';

interface LoadingProps {
  label?: string;
  size: 'large' | 'small';
}

export const Loading = ({ label, size }: LoadingProps) => {
  return (
    <div className={styles['loading-icon']}>
      {size === 'large' ? (
        <LargeLoadingIcon className={styles['loading-icon__spinner']} />
      ) : (
        <SmallLoadingIcon className={styles['loading-icon__spinner']} />
      )}
      {label && <p className={styles['loading-icon__text']}>{label}</p>}
    </div>
  );
};
