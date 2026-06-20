import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { characterReducer } from './slices/character';
import { charactersReducer } from './slices/characters';
import { charactersFiltersReducer } from './slices/charactersFilters';

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
