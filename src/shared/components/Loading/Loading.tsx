import { LargeLoadingIcon, SmallLoadingIcon } from '@/assets';

import styles from './Loading.module.css';

type TLoadingProps = {
  size: 'large' | 'small';
  label?: string;
};

export const Loading = ({ label, size }: TLoadingProps) => {
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
