import { apiClient } from './apiClient';

type IGetCharactersParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
  page?: number;
};

export const getCharacters = (
  signal?: AbortSignal,
  params?: IGetCharactersParams
) => apiClient.get('/character', { signal, params });

export const getCharacterById = (id: number, signal?: AbortSignal) =>
  apiClient.get(`/character/${id}`, { signal });
