import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCharacterById } from '@/shared/api';
import type { TCharacter, TLoadStatus } from '@/shared/types';

interface CharacterState {
  character: TCharacter | null;
  status: TLoadStatus;
}

const initialState: CharacterState = {
  character: null,
  status: 'idle'
};

export const fetchCharacter = createAsyncThunk(
  'character/fetchCharacter',
  async (id: number) => {
    const response = await getCharacterById(id);
    return response.data;
  }
);

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.character = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCharacter.rejected, (state) => {
        state.status = 'error';
      });
  }
});

export const characterReducer = characterSlice.reducer;
