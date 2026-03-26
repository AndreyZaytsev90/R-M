import { useState } from 'react';
import { Link } from 'react-router';

import { CloseIcon, EditIcon, RickSanchezIcon, SaveIcon } from '@/assets';
import { Input, STATUS_OPTIONS, Select, StatusIndicator, StatusOption, type TCharacter, type TStatus } from '@/shared';

import styles from './CharacterCard.module.scss';

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
        <div className={styles.character_card__info}>
          <div className={styles.character_card__name_wrapper}>
            {isEdit ? (
              <Input value={name} onChange={setName} variant='underlined' />
            ) : (
              <Link to={`/characters/character-card/${character.id}`} className={styles.character_card__name}>
                {name}
              </Link>
            )}
          </div>

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
              <div className={styles.character_card__field}>
                {isEdit ? (
                  <Input value={location} onChange={setLocation} variant='underlined' size='small' />
                ) : (
                  <p className={styles.character_card__value}>{location}</p>
                )}
              </div>
            </div>
            <div className={styles.character_card__options}>
              <p className={styles.character_card__title}>Status</p>
              <div className={styles.character_card__field}>
                {isEdit ? (
                  <Select
                    className={styles.character_card__status_select}
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    placeholder='Alive'
                    onChange={(value) => setStatusValue(value)}
                    size='small'
                    OptionsComponent={StatusOption}
                  />
                ) : (
                  <div className={styles.character_card__status}>
                    <p className={styles.character_card__value}>
                      {statusValue && statusValue[0].toUpperCase() + statusValue.slice(1)}
                    </p>
                    {statusValue && <StatusIndicator status={statusValue}></StatusIndicator>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.character_card__buttons}>
            {isEdit ? (
              <div className={styles.character_card__edit_buttons}>
                <CloseIcon width={24} height={24} onClick={() => {}}></CloseIcon>
                <SaveIcon onClick={() => setIsEdit(false)}></SaveIcon>
              </div>
            ) : (
              <EditIcon onClick={() => setIsEdit(true)}></EditIcon>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
