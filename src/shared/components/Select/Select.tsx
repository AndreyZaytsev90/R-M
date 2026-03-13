import { type ComponentType, useEffect, useRef, useState } from 'react';

import { IconArrowDropdown } from '@/assets';
import { cn } from '@/shared/lib';

import styles from './Select.module.css';

type TOption<T> = {
  label: string;
  value: T;
};

type TOptionsComponentProps<T> = {
  option: TOption<T>;
};

type TSelectProps<T> = {
  options: TOption<T>[];
  placeholder: string;
  value: T | null;
  onChange: (value: T | null) => void;
  size: 'large' | 'small';
  OptionsComponent?: ComponentType<TOptionsComponentProps<T>>;
};

const DefaultOptionsComponent = <T,>({ option }: TOptionsComponentProps<T>) => {
  return <span>{option.label}</span>;
};

export const Select = <T,>({
  options,
  placeholder,
  value,
  onChange,
  OptionsComponent = DefaultOptionsComponent,
  size
}: TSelectProps<T>) => {
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
        <IconArrowDropdown className={cn(styles.select__arrow, { [styles['select__arrow--up']]: isOpen })} />
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
