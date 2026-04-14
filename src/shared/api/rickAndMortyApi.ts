import { apiClient } from './apiClient';

type IGetCharactersParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
};

export const getCharacters = async (
  signal?: AbortSignal,
  params?: IGetCharactersParams
) => {
  const response = await apiClient.get('/character', { signal, params });
  return response.data;
};
