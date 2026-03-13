import { type ReactNode } from 'react';

import { IconClose } from '@/assets';

import styles from './Input.module.css';

type InputProps = {
  value: string;
  variant: 'bordered' | 'underlined';
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export const Input = ({ value, onChange, placeholder, icon, variant, disabled }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

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

      {value && (
        <button type='button' className={styles.clear} onClick={handleClear} aria-label='Очистить поле'>
          <IconClose />
        </button>
      )}
    </div>
  );
};
