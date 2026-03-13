import { type TStatus } from '@/shared/types';

export type TSelectOption<T> = { label: string; value: T };

export const SPECIES_OPTIONS: TSelectOption<string>[] = [
  { label: 'human', value: 'Human' },
  { label: 'alien', value: 'Alien' },
  { label: 'humanoid', value: 'Humanoid' },
  { label: 'animal', value: 'Animal' },
  { label: 'robot', value: 'Robot' }
];

export const STATUS_OPTIONS: TSelectOption<TStatus>[] = [
  { label: 'alive', value: 'Alive' },
  { label: 'dead', value: 'Dead' },
  { label: 'unknown', value: 'Unknown' }
];
