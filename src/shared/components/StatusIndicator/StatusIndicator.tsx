import clsx from 'clsx';

import type { Status } from '@/shared/types';

import styles from './StatusIndicator.module.css';

type StatusIndicatorProps = {
  status: Status;
  className?: string;
};

const statusClassMap: Record<Status, string> = {
  Alive: styles.alive,
  Dead: styles.dead,
  Unknown: styles.unknown
};

export const StatusIndicator = ({ status, className = '' }: StatusIndicatorProps) => (
  <span className={clsx(styles.statusIndicator, statusClassMap[status], className)} />
);
