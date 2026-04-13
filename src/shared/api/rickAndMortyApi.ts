import { apiClient } from './apiClient';

export const getCharacters = async (signal?: AbortSignal) => {
  const response = await apiClient.get('/character', { signal });
  return response.data;
};
