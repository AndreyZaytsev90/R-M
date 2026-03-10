import { IconArrowDropdown } from '@/assets';
import { cn } from '@/shared';

import styles from './ArrowIcon.module.css';

type ArrowIconProps = {
  direction: 'up' | 'down';
  size: 'large' | 'small';
};

const sizeClassMap = {
  large: styles.sizeLarge,
  small: styles.sizeSmall
};

const directionClassMap = {
  up: styles.directionUp,
  down: styles.directionDown
};

export const ArrowIcon = ({ direction, size }: ArrowIconProps) => (
  <IconArrowDropdown className={cn(styles.arrow, sizeClassMap[size], directionClassMap[direction])} />
);
