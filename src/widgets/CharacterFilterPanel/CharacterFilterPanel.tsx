import { useState } from 'react';

import { SearchIcon } from '@/assets';
import { Input, Select } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';
import type { TFilterType } from '@/shared/types';

import styles from './CharacterFilterPanel.module.scss';

export const CharacterFilterPanel = () => {
  const [filters, setFilters] = useState<Record<TFilterType, string | null>>({
    species: null,
    gender: null,
    status: null
  });

  const [inputSearchValue, setInputSearchValue] = useState('');

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className={styles.selects}>
      <Input
        placeholder='Filter by name...'
        value={inputSearchValue}
        onChange={setInputSearchValue}
        variant='bordered'
        icon={<SearchIcon />}
      />
      <Select
        options={SPECIES_OPTIONS}
        placeholder='Species'
        value={filters.species}
        onChange={(value) => handleFilterChange('species', value)}
        size='large'
      />
      <Select
        options={GENDER_OPTIONS}
        placeholder='Gender'
        value={filters.gender}
        onChange={(value) => handleFilterChange('gender', value)}
        size='large'
      />
      <Select
        options={STATUS_OPTIONS}
        placeholder='Status'
        value={filters.status}
        onChange={(value) => handleFilterChange('status', value)}
        size='large'
      />
    </div>
  );
};
