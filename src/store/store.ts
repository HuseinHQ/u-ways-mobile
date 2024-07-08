import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import userReducer from './userSlice';
import facultyReducer from './facultySlice';
import lecturerReducer from './lecturerSlice';
import majorReducer from './majorSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  faculty: facultyReducer,
  lecturer: lecturerReducer,
  major: majorReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const clearPersistedState = async () => {
  await persistor.purge();
};

export const persistor = persistStore(store);
export default store;
