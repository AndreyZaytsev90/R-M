import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { charactersFiltersReducer } from './slices/charactersFilters';

const rootReducer = combineReducers({
  charactersFilters: charactersFiltersReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
