import { EditIcon, RickSanchezIcon } from '@/assets';
import type { TGender, TSpecies, TStatus } from '@/shared';

import styles from './CharacterCard.module.css';

export type TCharacter = {
  id: number;
  name: string;
  gender: TGender;
  species: TSpecies;
  location: string;
  status: TStatus;
};
type TCharacterCardProps = {
  character: TCharacter;
};

export const CharacterCard = ({ character }: TCharacterCardProps) => {
  return (
    <div className={styles.character_card}>
      <div className={styles.character_card__content}>
        <img src={RickSanchezIcon} alt='RickSanchezMainIcon' />
        <div>
          <h2 className={styles.character_card__name}>{character.name}</h2>
          <div className={styles.character_card__characteristics}>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Gender</p>
              <p className={styles.character_card__value}>{character.gender}</p>
            </div>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Species</p>
              <p className={styles.character_card__value}>{character.species}</p>
            </div>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Location</p>
              <p className={styles.character_card__value}>{character.location}</p>
            </div>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Status</p>
              <p className={styles.character_card__value}>{character.status}</p>
            </div>
          </div>
          <div className={styles.character_card__buttons}>
            <EditIcon></EditIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
