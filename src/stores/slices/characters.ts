import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { VISIBLE_PAGE_SIZE } from '@/shared/constants';
import type { IFilterParams, TCharacter } from '@/shared/types';

interface CharactersState {
  filters: IFilterParams;
  accumulatedCharacters: TCharacter[];
  currentPage: number;
  visibleCount: number;
}

const initialState: CharactersState = {
  filters: {
    name: null,
    species: null,
    gender: null,
    status: null
  },
  accumulatedCharacters: [],
  currentPage: 1,
  visibleCount: VISIBLE_PAGE_SIZE
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
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
    },
    resetFilters: (state) => {
      state.filters = { name: null, species: null, gender: null, status: null };
      state.accumulatedCharacters = [];
      state.currentPage = 1;
      state.visibleCount = VISIBLE_PAGE_SIZE;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addUniqueCharacters: (state, action: PayloadAction<TCharacter[]>) => {
      const ids = new Set(state.accumulatedCharacters.map((c) => c.id));
      const newOnes = action.payload.filter((c) => !ids.has(c.id));
      if (newOnes.length) state.accumulatedCharacters.push(...newOnes);
    },
    clearCharacters: (state) => {
      state.accumulatedCharacters = [];
      state.currentPage = 1;
      state.visibleCount = VISIBLE_PAGE_SIZE;
    },
    setVisibleCount: (state, action: PayloadAction<number>) => {
      state.visibleCount = action.payload;
    }
  }
});

export const {
  setFilterName,
  setFilterSpecies,
  setFilterGender,
  setFilterStatus,
  resetFilters,
  setCurrentPage,
  addUniqueCharacters,
  clearCharacters,
  setVisibleCount
} = charactersSlice.actions;

export const charactersReducer = charactersSlice.reducer;
