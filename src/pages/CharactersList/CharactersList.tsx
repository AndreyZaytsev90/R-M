import LogoRickAndMorty from '@/assets/images/logoRickAndMorty.svg';
import { Loading } from '@/shared/components/Loading/Loading';
import styles from '../CharactersList/CharactersList.module.css';

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
