import LogoRickAndMorty from '../../assets/LogoRickAndMorty.svg';
import BigLoadingIcon from '../../assets/Loading component 1.svg';
import styles from '../CharactersList/CharactersList.module.css';

export const CharactersList = () => {
  return (
    <div className={styles['characters-list']}>
      <LogoRickAndMorty className={styles['characters-list__logo']} />
      <BigLoadingIcon className={styles['characters-list__loadingLogo']} />
      Loading characters...
    </div>
  );
};
