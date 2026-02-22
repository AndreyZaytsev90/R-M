import clsx from 'clsx';

import IconArrowDropdown from '@/assets/icons/iconArrowDropdown.svg';

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
  <IconArrowDropdown className={clsx(styles.arrow, sizeClassMap[size], directionClassMap[direction])} />
);
