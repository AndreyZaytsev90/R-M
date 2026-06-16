import { useNavigate, useParams } from 'react-router';

import { GoBackIcon } from '@/assets';
import { Button, Loading } from '@/shared/components';
import { useCharacterById } from '@/shared/hooks/useCharacterById';

import { NotFoundPage } from '../NotFound/NotFoundPage';
import styles from './CharacterCardPage.module.scss';
import { CharacterInfoList } from './CharacterInfoList';

export const CharacterCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, isLoading, isError } = useCharacterById(Number(id));

  const goBack = () => navigate('/');

  const backButton = (
    <Button className={styles.button} onClick={goBack}>
      <GoBackIcon />
      <span className={styles.buttonText}>GO BACK</span>
    </Button>
  );

  if (isLoading)
    return (
      <main className={styles.container}>
        {backButton}
        <div className={styles.loading}>
          <Loading label='Loading character card...' size='large' />
        </div>
      </main>
    );

  if (isError || !character)
    return (
      <main className={styles.container}>
        {backButton}
        <div className={styles.notFound}>
          <NotFoundPage />
        </div>
      </main>
    );

  return (
    <main className={styles.container}>
      {backButton}

      <div className={styles.character}>
        <img
          className={styles.avatar}
          src={character.image}
          alt={character.name}
        />
        <h1 className={styles.name}>{character.name}</h1>

        <p className={styles.sectionTitle}>Information</p>

        <CharacterInfoList character={character} />
      </div>
    </main>
  );
};
