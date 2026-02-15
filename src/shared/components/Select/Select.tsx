import type { ComponentType } from 'react';

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
  DefaultOptionsComponent: ComponentType<DefaultOptionsComponentProps<T>>;
  size: 'large' | 'small';
};

export const Select = <T,>({ options, placeholder, value, DefaultOptionsComponent, size }: SelectProps) => {
  return <select>{options}</select>;
};
