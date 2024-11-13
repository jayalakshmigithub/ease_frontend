import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../Redux/Slice/userSlice'
import adminSlice from './Slice/adminSlice';



const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  admin: adminSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);
export default rootReducer;
export { store, persistor };