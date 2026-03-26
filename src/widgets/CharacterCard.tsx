import { useState } from 'react';
import { Link } from 'react-router';

import { EditIcon, RickSanchezIcon, SaveIcon } from '@/assets';
import { Input, STATUS_OPTIONS, Select, StatusOption, type TCharacter, type TStatus } from '@/shared';

import styles from './CharacterCard.module.css';

type TCharacterCardProps = {
  character: TCharacter;
};

export const CharacterCard = ({ character }: TCharacterCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('Rick Sanchez');
  const [location, setLocation] = useState('Earth');
  const [statusValue, setStatusValue] = useState<TStatus | null>('alive');

  return (
    <div className={styles.character_card}>
      <div className={styles.character_card__content}>
        <img src={RickSanchezIcon} alt='RickSanchezMainIcon' />
        <div>
          {isEdit ? (
            <Input value={name} onChange={setName} variant='underlined' />
          ) : (
            <Link to={`/characters/character-card/${character.id}`} className={styles.character_card__name}>
              {name}
            </Link>
          )}

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
              {isEdit ? (
                <Input value={location} onChange={setLocation} variant='underlined' />
              ) : (
                <p className={styles.character_card__value}>{location}</p>
              )}
            </div>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Status</p>
              {isEdit ? (
                <Select
                  options={STATUS_OPTIONS}
                  value={statusValue}
                  placeholder='Alive'
                  onChange={(value) => setStatusValue(value)}
                  size='small'
                  OptionsComponent={StatusOption}
                />
              ) : (
                <p className={styles.character_card__value}>{character.status}</p>
              )}
            </div>
          </div>
          <div className={styles.character_card__buttons}>
            {isEdit ? (
              <SaveIcon onClick={() => setIsEdit(false)}></SaveIcon>
            ) : (
              <EditIcon onClick={() => setIsEdit(true)}></EditIcon>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
