import { STATUS_OPTIONS, type TStatus } from '@/shared';

export const normalizeStatus = (status: string): TStatus | null => {
  const normalized = status.toLowerCase();
  return (
    STATUS_OPTIONS.find((status) => status.value === normalized)?.value ?? null
  );
};
