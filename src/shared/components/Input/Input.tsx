import { type ReactNode } from 'react';

import { CloseIcon } from '@/assets';
import { cn } from '@/shared/lib';

import styles from './Input.module.scss';

type TInputProps = {
  value: string;
  variant: 'bordered' | 'underlined';
  size?: 'large' | 'small';
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  icon,
  variant,
  size = 'large',
  disabled
}: TInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={cn(styles.input, {
        [styles[`input--${variant}`]]: variant,
        [styles[`input--${size}`]]: size !== 'large'
      })}
    >
      {variant === 'bordered' && icon && (
        <span className={styles.input__icon}>{icon}</span>
      )}
      <input
        className={styles.input__field}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />

      {value && (
        <button
          type='button'
          className={styles.input__clear}
          onClick={handleClear}
          aria-label='Очистить поле'
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
