import { type ComponentType, useState } from 'react';

import clsx from 'clsx';

import { IconArrowDown, IconArrowDownSmall, IconArrowUp, IconArrowUpSmall } from '@/assets';

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
  defaultValue?: T;
};

const SIZE_CONFIG = {
  large: {
    wrapper: clsx(styles.selectWrapper, styles.selectWrapperLarge),
    select: clsx(styles.select, styles.selectLarge),
    options: clsx(styles.selectOptions, styles.selectOptionsLarge),
    option: clsx(styles.selectOption, styles.selectOptionLarge),
    IconOpen: IconArrowUp,
    IconClosed: IconArrowDown
  },
  small: {
    wrapper: clsx(styles.selectWrapper, styles.selectWrapperSmall),
    select: clsx(styles.select, styles.selectSmall),
    options: clsx(styles.selectOptions, styles.selectOptionsSmall),
    option: clsx(styles.selectOption, styles.selectOptionSmall),
    IconOpen: IconArrowUpSmall,
    IconClosed: IconArrowDownSmall
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
  const { wrapper, select, options: optionsList, option: optionItem, IconOpen, IconClosed } = SIZE_CONFIG[size];

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
        {isOpen ? <IconOpen /> : <IconClosed />}
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
