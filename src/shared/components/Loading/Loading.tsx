import LargeLoadingIcon from '@/assets/images/largeLoadingIcon.svg';
import SmallLoadingIcon from '@/assets/images/smallLoadingIcon.svg';
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
