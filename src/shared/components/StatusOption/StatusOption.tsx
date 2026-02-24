import { type Status, StatusIndicator } from '@/shared';

type StatusOptionProps = {
  option: { label: string; value: Status };
};

export const StatusOption = ({ option }: StatusOptionProps) => (
  <span>
    {option.value} <StatusIndicator status={option.value} />
  </span>
);
