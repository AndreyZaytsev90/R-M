import { SearchIcon } from '@/assets';
import { Input, Select } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';
import type { TFilterType } from '@/shared/types';

import styles from './CharacterFilterPanel.module.scss';

type IFilterPanelProps = {
  filters: {
    name: string | null;
    species: string | null;
    gender: string | null;
    status: string | null;
  };
  onSearchChange: (value: string) => void;
  onFilterChange: (type: TFilterType, value: string | null) => void;
};

export const CharacterFilterPanel = ({
  filters,
  onSearchChange,
  onFilterChange
}: IFilterPanelProps) => {
  return (
    <div className={styles.selects}>
      <Input
        placeholder='Filter by name...'
        value={filters.name || ''}
        onChange={(value) => onSearchChange(value)}
        variant='bordered'
        icon={<SearchIcon />}
      />
      <Select
        options={SPECIES_OPTIONS}
        placeholder='Species'
        value={filters.species}
        onChange={(value) => onFilterChange('species', value)}
        size='large'
      />
      <Select
        options={GENDER_OPTIONS}
        placeholder='Gender'
        value={filters.gender}
        onChange={(value) => onFilterChange('gender', value)}
        size='large'
      />
      <Select
        options={STATUS_OPTIONS}
        placeholder='Status'
        value={filters.status}
        onChange={(value) => onFilterChange('status', value)}
        size='large'
      />
    </div>
  );
};
