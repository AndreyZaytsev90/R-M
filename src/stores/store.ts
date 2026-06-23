import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { characterReducer } from '@/stores/slices/character';
import { charactersReducer } from '@/stores/slices/characters';
import { charactersFiltersReducer } from '@/stores/slices/charactersFilters';

const rootReducer = combineReducers({
  charactersFilters: charactersFiltersReducer,
  characters: charactersReducer,
  character: characterReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
