import { type TStatus } from '@/shared/types';

export type TSelectOption<T> = { label: string; value: T };

export const SPECIES_OPTIONS: TSelectOption<string>[] = [
  { label: 'Human', value: 'human' },
  { label: 'Alien', value: 'alien' },
  { label: 'Humanoid', value: 'humanoid' },
  { label: 'Animal', value: 'animal' },
  { label: 'Robot', value: 'robot' }
];

export const STATUS_OPTIONS: TSelectOption<TStatus>[] = [
  { label: 'Alive', value: 'Alive' },
  { label: 'Dead', value: 'Dead' },
  { label: 'Unknown', value: 'Unknown' }
];
