import { useNavigate } from 'react-router';
import iconGoBack from '../../assets/Group 4.svg';

export const CharacterCard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>
        <img src={iconGoBack} alt='Кнопка назад' />
      </button>
      CharacterCard
    </div>
  );
};
