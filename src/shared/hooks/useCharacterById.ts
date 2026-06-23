import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchCharacter } from '@/stores/slices/character';

export const useCharacterById = (id: number) => {
  const dispatch = useAppDispatch();
  const { character, status } = useAppSelector((state) => state.character);

  const isInvalidId = !id || isNaN(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacter(id));
    }
  }, [id, dispatch]);

  return {
    character: isInvalidId ? null : character,
    isLoading: status === 'loading',
    isError: status === 'error'
  };
};
