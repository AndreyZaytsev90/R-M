import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { RickAndMortyIcon } from '@/assets';
import { getCharacters } from '@/shared/api/rickAndMortyApi';
import { Loading } from '@/shared/components';
import { type TCharactersResponse } from '@/shared/types';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const [characters, setCharacters] = useState<TCharactersResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters();
        if (data) {
          setCharacters(data);
          setHasError(false);
        }
      } catch (error) {
        let message = 'Не удалось загрузить список персонажей';
        if (error instanceof Error) {
          message = error.message;
        }
        setHasError(true);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacters();
  }, []);

  return (
    <main className={styles.container}>
      <img
        src={RickAndMortyIcon}
        alt='Rick and Morty'
        width={600}
        height={200}
      />
      <CharacterFilterPanel />
      {!hasError && characters && (
        <section className={styles.cardList}>
          {characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </section>
      )}
      {isLoading && <Loading size='small' />}
    </main>
  );
};
