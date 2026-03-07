import styles from './Input.module.css';

type InputProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: string;
  variant: 'bordered' | 'underlined';
};

export const Input = ({ value, onChange, placeholder, icon, variant }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles[variant]} type='text' placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};
