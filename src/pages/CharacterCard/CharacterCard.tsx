import { useNavigate } from 'react-router';
import styles from '../CharacterCard/CharacterCard.module.css';
import IconGoBack from '../../assets/Group 4.svg';
import { Loading } from '../../shared/components/Loading/Loading';

export const CharacterCard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['characters-card']}>
      <button className={styles['characters-card__button']} onClick={() => navigate('/')}>
        <IconGoBack />
      </button>
      <div className={styles['characters-card__loading']}>
        <Loading label='Loading character card...' />
      </div>
    </div>
  );
};
