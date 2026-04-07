import { apiClient } from './apiClient';

export const getCharacters = async () => {
  const response = await apiClient.get('/character');
  return response.data;
};
