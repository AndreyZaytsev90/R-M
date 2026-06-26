import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IFilterParams, TCharacter, TLoadStatus } from '@/shared/types';

interface CharactersState {
  characters: TCharacter[];
  nextPage?: number;
  status: TLoadStatus;
  error: string | null;
  filters: IFilterParams;
}

const initialState: CharactersState = {
  characters: [],
  nextPage: undefined,
  status: 'idle',
  error: null,
  filters: {
    name: null,
    species: null,
    gender: null,
    status: null
  }
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<TCharacter[]>) => {
      state.characters = action.payload;
      state.status = 'success';
    },
    addCharacters: (state, action: PayloadAction<TCharacter[]>) => {
      state.characters.push(...action.payload);
    },
    setNextPage: (state, action: PayloadAction<number | undefined>) => {
      state.nextPage = action.payload;
    },
    setStatus: (state, action: PayloadAction<TLoadStatus>) => {
      state.status = action.payload;
    },
    resetCharacters: (state) => {
      state.characters = [];
      state.nextPage = undefined;
      state.status = 'idle';
      state.error = null;
    },
    setFilterName: (state, action: PayloadAction<string | null>) => {
      state.filters.name = action.payload;
    },
    setFilterSpecies: (state, action: PayloadAction<string | null>) => {
      state.filters.species = action.payload;
    },
    setFilterGender: (state, action: PayloadAction<string | null>) => {
      state.filters.gender = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.filters.status = action.payload;
    }
  }
});

export const {
  setCharacters,
  addCharacters,
  setNextPage,
  setStatus,
  resetCharacters,
  setFilterName,
  setFilterSpecies,
  setFilterGender,
  setFilterStatus
} = charactersSlice.actions;

export const charactersReducer = charactersSlice.reducer;
