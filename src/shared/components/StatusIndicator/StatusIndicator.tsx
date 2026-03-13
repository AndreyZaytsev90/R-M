import { cn } from '@/shared/lib';
import { type TStatus } from '@/shared/types';

import styles from './StatusIndicator.module.css';

type TStatusIndicatorProps = {
  status: TStatus;
  className?: string;
};

export const StatusIndicator = ({ status, className }: TStatusIndicatorProps) => (
  <span className={cn(styles.statusIndicator, styles[`statusIndicator--${status.toLowerCase()}`], className)} />
);
