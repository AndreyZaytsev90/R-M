import { Loading } from '@/shared';
import styles from '../CharactersList/CharactersList.module.css';
import { LogoRickAndMorty } from '@/assets';

export const CharactersList = () => {
  return (
    <main className={styles.container}>
      <LogoRickAndMorty />
      <section>
        <Loading label='Loading characters...' size='large' />
      </section>
    </main>
  );
};
