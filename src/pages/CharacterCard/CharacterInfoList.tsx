import { clsx } from 'clsx';

import type { TCharacter } from '@/shared/types';

import styles from './CharacterCardPage.module.scss';

type TCharacterInfoListProps = {
  character: TCharacter;
  className?: string;
};

export const CharacterInfoList = ({
  character,
  className
}: TCharacterInfoListProps) => {
  const infoItems = [
    { label: 'Gender', value: character.gender },
    { label: 'Status', value: character.status },
    { label: 'Specie', value: character.species },
    { label: 'Origin', value: character.origin.name },
    { label: 'Type', value: character.type || 'Unknown' },
    { label: 'Location', value: character.location.name }
  ];

  return (
    <ul className={clsx(styles.infoList, className)}>
      {infoItems.map(({ label, value }) => (
        <li key={label} className={styles.infoItem}>
          <span className={styles.infoLabel}>{label}</span>
          <span className={styles.infoValue}>{value}</span>
        </li>
      ))}
    </ul>
  );
};
