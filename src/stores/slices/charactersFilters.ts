import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IFilterParams } from '@/shared/types';

const initialState: IFilterParams = {
  name: null,
  species: null,
  gender: null,
  status: null
};

const charactersFiltersSlice = createSlice({
  name: 'charactersFilters',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },

    setSpecies: (state, action: PayloadAction<string | null>) => {
      state.species = action.payload;
    },

    setGender: (state, action: PayloadAction<string | null>) => {
      state.gender = action.payload;
    },

    setStatus: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload;
    },
    resetFilters: (state) => {
      state.name = null;
      state.species = null;
      state.gender = null;
      state.status = null;
    }
  }
});

export const { setName, setSpecies, setGender, setStatus, resetFilters } =
  charactersFiltersSlice.actions;

export const charactersFiltersReducer = charactersFiltersSlice.reducer;
