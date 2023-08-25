import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import InfoReducer, { infoSlice } from './reducer/info';
import GlobalComponentsInfoReducer, { globalComponentsInfoSlice } from './reducer/globalComponentsInfo';
import ConfigInfoReducer, { configInfoSlice } from './reducer/configInfo';

const rootReducer = combineReducers({
  [infoSlice.name]: InfoReducer,
  [globalComponentsInfoSlice.name]: GlobalComponentsInfoReducer,
  [configInfoSlice.name]: ConfigInfoReducer,
});

const makeStore = () => {
  const persistConfig = {
    key: 'nextjs',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
  });

  return {
    ...store,
    __persistor: persistStore(store),
  };
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const store: AppStore = makeStore();
export const dispatch: AppDispatch = store.dispatch;
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
