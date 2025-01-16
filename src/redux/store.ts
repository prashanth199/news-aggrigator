import { configureStore } from '@reduxjs/toolkit';
import { headlinesApi } from './services/headlinesApi'
import { everythingApi } from './services/everythingApi'

const store = configureStore({
  reducer: {
    [headlinesApi.reducerPath]: headlinesApi.reducer,
    [everythingApi.reducerPath]: everythingApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(headlinesApi.middleware).concat(everythingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
