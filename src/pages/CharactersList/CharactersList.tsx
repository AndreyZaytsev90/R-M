import LogoRickAndMorty from '../../assets/LogoRickAndMorty.svg';
import { Loading } from '../../shared/components/Loading/Loading';
import styles from '../CharactersList/CharactersList.module.css';

export const CharactersList = () => {
  return (
    <div className={styles['characters-list']}>
      <LogoRickAndMorty className={styles['characters-list__logo']} />
      <Loading label='Loading characters...' />
    </div>
  );
};
