import { useState, type ComponentType } from 'react';
import styles from './Select.module.css';
import { IconArrowDown, IconArrowUp } from '@/assets';

type Options<T> = {
  label: string;
  value: T;
};

type OptionsComponentProps<T> = {
  option: Options<T>;
};

type SelectProps<T> = {
  options: Options<T>[];
  placeholder?: string;
  value: T | null;
  onChange: (value: T | null) => void;
  OptionsComponent?: ComponentType<OptionsComponentProps<T>>;
  size: 'large' | 'small';
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
  size = 'large'
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const optionClickHandler = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  //   const onClickCleanHandler = () => {
  //     onChange(null);
  //   };

  return (
    size && (
      <div className={styles.selectWrapper}>
        <button className={styles.select} onClick={onClickHandler}>
          {selectedOption?.label ? <OptionsComponent option={selectedOption} /> : placeholder}
          {isOpen ? <IconArrowUp /> : <IconArrowDown />}
        </button>
        {isOpen && (
          <ul className={styles.selectOptions}>
            {options.map((option) => (
              <li
                key={String(option.value)}
                className={styles.selectOption}
                onClick={() => optionClickHandler(option.value)}
              >
                <OptionsComponent option={option} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};
