import { avatarRickSanchez } from '@/assets';
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
        <img src={avatarRickSanchez} alt='avatarRickSanchez' />
        <div>
          <h2>{character.name}</h2>
          <div className={styles.character_card__characteristics}>
            <div>
              <p className={styles.character_card__title}>Gender</p>
              <p>{character.gender}</p>
            </div>
            <div>
              <p className={styles.character_card__title}>Species</p>
              <p>{character.species}</p>
            </div>
            <div>
              <p className={styles.character_card__title}>Location</p>
              <p>{character.location}</p>
            </div>
            <div>
              <p className={styles.character_card__title}>Status</p>
              <p>{character.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
