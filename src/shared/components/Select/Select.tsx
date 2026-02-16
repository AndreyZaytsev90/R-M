import { useState, type ComponentType } from 'react';

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

  const onClickCleanHandler = () => {
    onChange(null);
  };

  return (
    size && (
      <div className='select'>
        <button className='select__button' onClick={onClickHandler}>
          {selectedOption?.label ? <OptionsComponent option={selectedOption} /> : placeholder}
        </button>
        {value !== null && (
          <button className='select__buttonClean ' onClick={onClickCleanHandler}>
            X
          </button>
        )}

        {isOpen && (
          <ul className='select__options'>
            {options.map((option) => (
              <li
                key={String(option.value)}
                className='select__option'
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
