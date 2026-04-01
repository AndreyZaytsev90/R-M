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
  const [selectSpeciesValue, setSelectSpeciesValue] = useState<string | null>(
    null
  );
  const [selectGenderValue, setSelectGenderValue] = useState<string | null>(
    null
  );
  const [selectStatusValue, setSelectStatusValue] = useState<string | null>(
    null
  );

  const [inputSearchValue, setInputSearchValue] = useState<string>('');

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    switch (type) {
      case 'species':
        setSelectSpeciesValue(value);
        break;
      case 'gender':
        setSelectGenderValue(value);
        break;
      case 'status':
        setSelectStatusValue(value);
        break;
    }
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
        value={selectSpeciesValue}
        onChange={(value) => handleFilterChange('species', value)}
        size='large'
      />
      <Select
        options={GENDER_OPTIONS}
        placeholder='Gender'
        value={selectGenderValue}
        onChange={(value) => handleFilterChange('gender', value)}
        size='large'
      />
      <Select
        options={STATUS_OPTIONS}
        placeholder='Status'
        value={selectStatusValue}
        onChange={(value) => handleFilterChange('status', value)}
        size='large'
      />
    </div>
  );
};
