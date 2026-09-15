import { createApi } from '@reduxjs/toolkit/query/react';
import { isAxiosError } from 'axios';

import type { TCharacter, TCharactersResponse } from '@/shared/types';

import { apiClient } from './apiClient';

export type TCharactersQueryParams = {
  name?: string | null;
  species?: string | null;
  gender?: string | null;
  status?: string | null;
  page?: number;
};

const axiosBaseQuery = async (args: {
  url: string;
  method: 'GET';
  params?: Record<string, unknown>;
}) => {
  try {
    const result = await apiClient({
      url: args.url,
      method: args.method,
      params: args.params
    });
    return { data: result.data };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: {
          status: error.response?.status ?? 'FETCH_ERROR',
          data: error.response?.data
        }
      };
    }
    return {
      error: { status: 'FETCH_ERROR', data: { message: 'Unexpected error' } }
    };
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCharacters: builder.query<TCharactersResponse, TCharactersQueryParams>({
      query: (params) => ({ url: '/character', method: 'GET', params })
    }),
    getCharacterById: builder.query<TCharacter, number>({
      query: (id) => ({ url: `/character/${id}`, method: 'GET' })
    })
  })
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
