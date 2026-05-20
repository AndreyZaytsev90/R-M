import type { TStatus } from '@/shared/types';

export const CHARACTER_STATUSES: Record<TStatus, string> = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'Unknown'
};
