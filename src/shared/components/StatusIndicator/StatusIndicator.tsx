import { cn } from '@/shared/lib';
import { type TStatus } from '@/shared/types';

import styles from './StatusIndicator.module.css';

type TStatusIndicatorProps = {
  status: TStatus;
  className?: string;
};

const statusClassMap: Record<TStatus, string> = {
  Alive: styles.alive,
  Dead: styles.dead,
  Unknown: styles.unknown
};

export const StatusIndicator = ({ status, className }: TStatusIndicatorProps) => (
  <span className={cn(styles.statusIndicator, statusClassMap[status], className)} />
);
