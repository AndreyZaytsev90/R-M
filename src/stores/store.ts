import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { characterReducer } from '@/stores/slices/character';
import { charactersReducer } from '@/stores/slices/characters';

const rootReducer = combineReducers({
  characters: charactersReducer,
  character: characterReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
