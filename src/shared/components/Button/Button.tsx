import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib';

import styles from './Button.module.scss';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
};

export const Button = ({
  children,
  variant = 'icon',
  className,
  ...props
}: TButtonProps) => {
  return (
    <button
      type='button'
      className={cn(styles.button, styles[`button--${variant}`], className)}
      {...props}
    >
      {children}
    </button>
  );
};
