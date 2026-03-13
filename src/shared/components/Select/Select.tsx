import { type ComponentType, useEffect, useRef, useState } from 'react';

import { ArrowIcon, cn } from '@/shared';

import styles from './Select.module.css';

type Option<T> = {
  label: string;
  value: T;
};

type OptionsComponentProps<T> = {
  option: Option<T>;
};

type SelectProps<T> = {
  options: Option<T>[];
  placeholder: string;
  value: T | null;
  onChange: (value: T | null) => void;
  size: 'large' | 'small';
  OptionsComponent?: ComponentType<OptionsComponentProps<T>>;
};

const DefaultOptionsComponent = <T,>({ option }: OptionsComponentProps<T>) => {
  return <span>{option.label}</span>;
};

export const Select = <T,>({
  options,
  placeholder,
  value,
  onChange,
  OptionsComponent = DefaultOptionsComponent,
  size
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const optionClickHandler = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={cn(styles.select, styles[`select--${size}`])}>
      <button className={styles.select__button} onClick={onClickHandler}>
        {selectedOption ? <OptionsComponent option={selectedOption} /> : placeholder}
        <ArrowIcon direction={isOpen ? 'up' : 'down'} size={size} />
      </button>
      {isOpen && (
        <ul className={styles.select__list}>
          {options.map((option) => (
            <li key={option.label} className={styles.select__option} onClick={() => optionClickHandler(option.value)}>
              <OptionsComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
