import { useState } from 'react';
import { Link } from 'react-router';

import { CloseIcon, EditIcon, RickSanchezIcon, SaveIcon } from '@/assets';
import {
  Input,
  STATUS_OPTIONS,
  Select,
  StatusIndicator,
  StatusOption,
  type TCharacter,
  type TStatus
} from '@/shared';

import styles from './CharacterCard.module.scss';

type TCharacterCardProps = {
  character: TCharacter;
};

export const CharacterCard = ({ character }: TCharacterCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('Rick Sanchez');
  const [location, setLocation] = useState('Earth');
  const [statusValue, setStatusValue] = useState<TStatus | null>('alive');

  const statusValueCard =
    statusValue &&
    STATUS_OPTIONS.find((opt) => opt.value === statusValue)?.label;

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
  };

  const handleCloseClick = () => {
    setIsEdit(false);
  };

  return (
    <div className={styles.characterCard}>
      <div className={styles.characterCard__content}>
        <img src={RickSanchezIcon} alt='RickSanchezMainIcon' />
        <div className={styles.characterCard__info}>
          <div className={styles.characterCard__nameWrapper}>
            {isEdit ? (
              <Input value={name} onChange={setName} variant='underlined' />
            ) : (
              <Link
                to={`/characters/${character.id}`}
                className={styles.characterCard__name}
              >
                {name}
              </Link>
            )}
          </div>

          <div className={styles.characterCard__characteristics}>
            <div className={styles.characterCard__options}>
              <p className={styles.characterCard__title}>Gender</p>
              <p className={styles.characterCard__value}>{character.gender}</p>
            </div>
            <div className={styles.characterCard__options}>
              <p className={styles.characterCard__title}>Species</p>
              <p className={styles.characterCard__value}>{character.species}</p>
            </div>
            <div className={styles.characterCard__options}>
              <p className={styles.characterCard__title}>Location</p>
              <div className={styles.characterCard__field}>
                {isEdit ? (
                  <Input
                    value={location}
                    onChange={setLocation}
                    variant='underlined'
                    size='small'
                  />
                ) : (
                  <p className={styles.characterCard__value}>{location}</p>
                )}
              </div>
            </div>
            <div className={styles.characterCard__options}>
              <p className={styles.characterCard__title}>Status</p>
              <div className={styles.characterCard__field}>
                {isEdit ? (
                  <Select
                    className={styles.characterCard__statusSelect}
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    placeholder='Выберите статус'
                    onChange={setStatusValue}
                    size='small'
                    OptionsComponent={StatusOption}
                  />
                ) : (
                  <div className={styles.characterCard__status}>
                    <p className={styles.characterCard__value}>
                      {statusValueCard}
                    </p>
                    {statusValue && <StatusIndicator status={statusValue} />}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.characterCard__buttons}>
            {isEdit ? (
              <div className={styles.characterCard__editButtons}>
                <CloseIcon width={24} height={24} onClick={handleCloseClick} />
                <SaveIcon onClick={handleSaveClick} />
              </div>
            ) : (
              <EditIcon onClick={handleEditClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
