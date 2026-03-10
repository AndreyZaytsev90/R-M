import { type ComponentType, useState } from 'react';

import { ArrowIcon, cn } from '@/shared';

import styles from './Select.module.css';

type Options<T> = {
  label: string;
  value: T;
};

type OptionsComponentProps<T> = {
  option: Options<T>;
};

type SelectProps<T> = {
  options: Options<T>[];
  placeholder: string;
  value: T | null;
  onChange: (value: T | null) => void;
  OptionsComponent?: ComponentType<OptionsComponentProps<T>>;
  size: 'large' | 'small';
};

const SIZE_CONFIG = {
  large: {
    wrapper: cn(styles.selectWrapper, styles.selectWrapperLarge),
    select: cn(styles.select, styles.selectLarge),
    options: cn(styles.selectOptions, styles.selectOptionsLarge),
    option: cn(styles.selectOption, styles.selectOptionLarge)
  },
  small: {
    wrapper: cn(styles.selectWrapper, styles.selectWrapperSmall),
    select: cn(styles.select, styles.selectSmall),
    options: cn(styles.selectOptions, styles.selectOptionsSmall),
    option: cn(styles.selectOption, styles.selectOptionSmall)
  }
};

const DefaultOptionsComponent = <T,>({ option }: OptionsComponentProps<T>) => {
  return <span>{String(option.value)}</span>;
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

  const selectedOption = options.find((option) => option.value === value);
  const { wrapper, select, options: optionsList, option: optionItem } = SIZE_CONFIG[size];

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const optionClickHandler = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={wrapper}>
      <button className={select} onClick={onClickHandler}>
        {selectedOption ? <OptionsComponent option={selectedOption} /> : placeholder}
        <ArrowIcon direction={isOpen ? 'up' : 'down'} size={size} />
      </button>
      {isOpen && (
        <ul className={optionsList}>
          {options.map((option) => (
            <li key={String(option.value)} className={optionItem} onClick={() => optionClickHandler(option.value)}>
              <OptionsComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
