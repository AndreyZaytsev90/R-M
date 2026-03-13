import { StatusIndicator, type TStatus } from '@/shared';

type TStatusOptionProps = {
  option: { label: string; value: TStatus };
};

export const StatusOption = ({ option }: TStatusOptionProps) => (
  <span>
    {option.value} <StatusIndicator status={option.value} />
  </span>
);
