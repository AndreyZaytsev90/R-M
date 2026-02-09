import LargeLoadingIcon from '../../../assets/Loading component 1.svg';
import SmallLoadingIcon from '../../../assets/Loading component little.svg';
import styles from './Loading.module.css';

interface LoadingProps {
  label?: string;
  size: 'large' | 'small';
}

export const Loading = ({ label, size }: LoadingProps) => {
  return (
    <div className={styles.loading}>
      {size === 'large' ? (
        <LargeLoadingIcon className={styles.spinner} />
      ) : (
        <SmallLoadingIcon className={styles.spinner} />
      )}
      {label && <p className={styles.loadingText}>{label}</p>}
    </div>
  );
};
