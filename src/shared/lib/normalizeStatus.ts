import { STATUS_OPTIONS, type TStatus } from '@/shared';

/**
 * Безопасное приведение строки статуса к TStatus.
 * API может возвращать "Alive", "Dead" и т.д., а тип ожидает "alive", "dead".
 * Если значение невалидно — возвращает null.
 */
export const normalizeStatus = (status: string): TStatus | null => {
  const normalized = status.toLowerCase();
  return (
    STATUS_OPTIONS.find((status) => status.value === normalized)?.value ?? null
  );
};
