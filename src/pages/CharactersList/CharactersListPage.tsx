import { useEffect, useState } from 'react';

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

  console.log('ПЕРСОНАЖИ', characters);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await getCharacters();
        if (response) {
          setCharacters(response);
        }
      } catch (error) {
        console.error('Error loading characters:', error);
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
      <section className={styles.cardList}>
        {characters &&
          characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </section>
      <Loading size='small' />
    </main>
  );
};
