import { StatusIndicator } from '@/shared/components';
import { type TStatus } from '@/shared/types';

type TStatusOptionProps = {
  option: { label: string; value: TStatus };
};

export const StatusOption = ({ option }: TStatusOptionProps) => (
  <span>
    {option.value} <StatusIndicator status={option.value} />
  </span>
);
