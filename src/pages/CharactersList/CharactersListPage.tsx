import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { type TCharacter } from '@/shared/types';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

import styles from './CharactersListPage.module.scss';

export const CharactersListPage = () => {
  const character: TCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'alive'
  };

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
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
        <CharacterCard character={character} />
      </section>
      <Loading size='small' />
    </main>
  );
};
