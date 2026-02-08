import LogoRickAndMorty from '../../assets/LogoRickAndMorty.svg';
import styles from '../CharactersList/CharactersList.module.css';

export const CharactersList = () => {
  return (
    <div className={styles['characters-list']}>
      <img className={styles['characters-list__logo']} src={LogoRickAndMorty} alt='Rick and Morty Logo' />
    </div>
  );
};
