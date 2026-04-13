import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';
import { useCharacters } from './hooks/useCharacters';

export const CharactersListPage = () => {
  const { characters, isLoading, hasError } = useCharacters();

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
