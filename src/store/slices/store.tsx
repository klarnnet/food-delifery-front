import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authService';
import { useDispatch } from 'react-redux';
import { authReducer } from './reducers/authSlice';
import { flatsApi } from '../services/flatsService';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';
import { favoriteApi } from '../services/favoriteService';
import { userApi } from '../services/userService';
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  authReducer,
  [flatsApi.reducerPath]: flatsApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(authPersistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    authApi.middleware,
    flatsApi.middleware,
    favoriteApi.middleware,
    userApi.middleware,
  ],
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;