// third-party
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { authApi } from './reducers/auth';
import { apiSlice } from './reducers/apiSlice';

// project import

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware),
  devTools: true,
});

const { dispatch } = store;

export { store, dispatch };
