import { useState, type ComponentType } from 'react';

type Options<T> = {
  label: string;
  value: T;
};

type DefaultOptionsComponentProps<T> = {
  option: Options<T>;
};

type SelectProps<T> = {
  options: Options<T>[];
  placeholder?: string;
  value: T;
  onChange: (value: T) => void;
  DefaultOptionsComponent?: ComponentType<DefaultOptionsComponentProps<T>>;
  size: 'large' | 'small';
};

export const Select = <T,>({
  options,
  placeholder,
  value,
  onChange,
  DefaultOptionsComponent,
  size = 'large'
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='select'>
      <button className='select__button' onClick={onClickHandler}>
        {selectedOption ? selectedOption.label : placeholder}
      </button>
      <ul className='select__options'>
        {options.map((option) => {
          return (
            isOpen && (
              <li key={String(option.label)} className='select__option'>
                {option.label}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};
