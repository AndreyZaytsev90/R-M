import { useGetCharacterByIdQuery } from '@/shared/api/apiSlice';

export const useCharacterById = (id: number) => {
  const {
    data: character,
    isLoading,
    isError
  } = useGetCharacterByIdQuery(id, {
    skip: !id || isNaN(id)
  });

  return {
    character: character ?? null,
    isLoading,
    isError
  };
};
