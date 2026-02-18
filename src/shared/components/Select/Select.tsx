import { type ComponentType, useState } from 'react';

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
  size
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

  return size === 'large' ? (
    <div className={styles.selectWrapperLarge}>
      <button className={styles.selectLarge} onClick={onClickHandler}>
        {selectedOption?.label ? <OptionsComponent option={selectedOption} /> : placeholder}
        {isOpen ? <IconArrowUp /> : <IconArrowDown />}
      </button>
      {isOpen && (
        <ul className={styles.selectOptionsLarge}>
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={styles.selectOptionLarge}
              onClick={() => optionClickHandler(option.value)}
            >
              <OptionsComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div className={styles.selectWrapperSmall}>
      <button className={styles.selectSmall} onClick={onClickHandler}>
        {selectedOption?.label ? <OptionsComponent option={selectedOption} /> : placeholder}
        {isOpen ? <IconArrowUpSmall /> : <IconArrowDownSmall />}
      </button>
      {isOpen && (
        <ul className={styles.selectOptionsSmall}>
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={styles.selectOptionSmall}
              onClick={() => optionClickHandler(option.value)}
            >
              <span>
                <OptionsComponent option={option} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
