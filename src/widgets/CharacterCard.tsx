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
      <div>{character.name}</div>
    </div>
  );
};
