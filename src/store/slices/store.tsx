import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authService';
import { useDispatch } from 'react-redux';
import { authReducer } from './reducers/authSlice';
import { foodApi } from '../services/foodService';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';
import { favoriteApi } from '../services/favoriteService';
import { historyApi } from '../services/historyService';
import { userApi } from '../services/userService';
import { paymentApi } from '../services/paymentService';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  authReducer,
  [foodApi.reducerPath]: foodApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
});

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(authPersistConfig, rootReducer);
const clearStateMiddleware = (store: { dispatch: (arg0: { type: string; }) => void; }) => (next: (arg0: any) => any) => (action: { type: string; }) => {
  if (action.type === 'CLEAR_STATE') {
    store.dispatch({ type: 'RESET_STATE' });
  }
  return next(action);
}
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    authApi.middleware,
    foodApi.middleware,
    favoriteApi.middleware,
    historyApi.middleware,
    userApi.middleware,
    paymentApi.middleware,
    clearStateMiddleware,
  ],
});

window.addEventListener('beforeunload', () => {
  store.dispatch({ type: 'CLEAR_STATE' });
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;