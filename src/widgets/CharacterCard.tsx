import { avatarRickSanchez } from '@/assets';

import styles from './CharacterCard.module.css';

type TCharacter = {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
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
          <div>{character.name}</div>
          <div>
            <h4 className={styles.character_card__title}>Gender</h4>
            <div>{character.gender}</div>
            <h4>Species</h4>
            <div>{character.species}</div>
            <h4>Location</h4>
            <div>{character.location}</div>
            <h4>Status</h4>
            <div>{character.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
