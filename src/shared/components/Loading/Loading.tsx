import { IconLoadingLarge, IconLoadingSmall } from '@/assets';

import styles from './Loading.module.css';

type TLoadingProps = {
  size: 'large' | 'small';
  label?: string;
};

export const Loading = ({ label, size }: TLoadingProps) => {
  return (
    <div className={styles.loading}>
      {size === 'large' ? (
        <IconLoadingLarge className={styles.spinner} />
      ) : (
        <IconLoadingSmall className={styles.spinner} />
      )}
      {label && <p className={styles.loadingText}>{label}</p>}
    </div>
  );
};
