import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '@/shared/api/apiSlice';
import { charactersReducer } from '@/stores/slices/characters';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  characters: charactersReducer
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
