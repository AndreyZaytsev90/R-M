import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router';

import clsx from 'clsx';

import { CloseIcon, EditIcon, SaveIcon } from '@/assets';
import {
  Button,
  Input,
  STATUS_OPTIONS,
  Select,
  StatusIndicator,
  StatusOption,
  type TCharacter,
  type TStatus,
  capitalize,
  normalizeStatus
} from '@/shared';

import styles from './CharacterCard.module.scss';

type TCharacterCardProps = {
  character: TCharacter;
  onUpdate: (id: number, updated: Partial<TCharacter>) => void;
};

export const CharacterCard = React.memo(
  ({ character, onUpdate }: TCharacterCardProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(character.name);
    const [location, setLocation] = useState(character.location.name);
    const [statusValue, setStatusValue] = useState<TStatus | null>(
      normalizeStatus(character.status)
    );

    const handleEditClick = () => {
      setIsEdit(true);
    };

    const handleSaveClick = () => {
      onUpdate(character.id, {
        name,
        location: { ...character.location, name: location },
        status: statusValue ?? character.status
      });
      setIsEdit(false);
    };

    const handleCloseClick = () => {
      setName(character.name);
      setLocation(character.location.name);
      setStatusValue(normalizeStatus(character.status));
      setIsEdit(false);
    };

    const normalizedStatus = normalizeStatus(character.status);

    return (
      <article className={styles.characterCard}>
        <div className={styles.characterCard__content}>
          <img src={character.image} alt={character.name} />
          <div className={styles.characterCard__info}>
            <div className={styles.characterCard__nameWrapper}>
              {isEdit ? (
                <Input value={name} onChange={setName} variant='underlined' />
              ) : (
                <Link
                  to={`/characters/${character.id}`}
                  className={clsx(
                    styles.characterCard__name,
                    styles.nameTruncate
                  )}
                  title={character.name}
                >
                  {character.name}
                </Link>
              )}
            </div>

            <div className={styles.characterCard__characteristics}>
              <div className={styles.characterCard__options}>
                <p className={styles.characterCard__title}>Gender</p>
                <p className={styles.characterCard__value}>
                  {character.gender}
                </p>
              </div>
              <div className={styles.characterCard__options}>
                <p className={styles.characterCard__title}>Species</p>
                <p className={styles.characterCard__value}>
                  {character.species}
                </p>
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
                    <p
                      className={clsx(
                        styles.characterCard__value,
                        styles.nameTruncate
                      )}
                      title={character.location.name}
                    >
                      {character.location.name}
                    </p>
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
                      placeholder='Выберите'
                      onChange={setStatusValue}
                      size='small'
                      OptionsComponent={StatusOption}
                    />
                  ) : (
                    <div className={styles.characterCard__status}>
                      <p className={styles.characterCard__value}>
                        {capitalize(character.status)}
                      </p>
                      {normalizedStatus && (
                        <StatusIndicator status={normalizedStatus} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.characterCard__buttons}>
              {isEdit ? (
                <div className={styles.characterCard__editButtons}>
                  <Button aria-label='Отмена' onClick={handleCloseClick}>
                    <CloseIcon width={24} height={24} />
                  </Button>
                  <Button aria-label='Сохранить' onClick={handleSaveClick}>
                    <SaveIcon />
                  </Button>
                </div>
              ) : (
                <Button aria-label='Редактировать' onClick={handleEditClick}>
                  <EditIcon />
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }
);
