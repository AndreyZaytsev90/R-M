import type { ReactNode } from 'react';

import { IconClose } from '@/assets';

import styles from './Input.module.css';

type InputProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  variant: 'bordered' | 'underlined';
};

export const Input = ({ value, onChange, placeholder, icon, variant }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles[variant]} type='text' placeholder={placeholder} value={value} onChange={handleChange} />
      {value.length > 0 && (
        <button className={styles.clear} onClick={() => onChange('')}>
          <IconClose />
        </button>
      )}
    </div>
  );
};
