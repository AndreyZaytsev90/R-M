import { useNavigate } from 'react-router';
import styles from '../CharacterCard/CharacterCard.module.css';
import IconGoBack from '../../assets/Group 4.svg';
import BigLoadingIcon from '../../assets/Loading component 1.svg';

export const CharacterCard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['characters-card']}>
      <button className={styles['characters-card__button']} onClick={() => navigate('/')}>
        <IconGoBack />
      </button>
      <BigLoadingIcon className={styles['characters-card__loadingLogo']} />
      Loading characters...
    </div>
  );
};
