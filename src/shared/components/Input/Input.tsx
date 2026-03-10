import { type ReactNode, useCallback } from 'react';

import { IconClose } from '@/assets';

import styles from './Input.module.css';

type InputProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  variant: 'bordered' | 'underlined';
  disabled?: boolean;
};

export const Input = ({ value, onChange, placeholder, icon, variant, disabled }: InputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={styles.container}>
      {variant === 'bordered' && <span className={styles.icon}>{icon}</span>}
      <input
        className={styles[variant]}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />

      {value.length > 0 && (
        <button type='button' className={styles.clear} onClick={handleClear} aria-label='Очистить поле'>
          <IconClose />
        </button>
      )}
    </div>
  );
};
