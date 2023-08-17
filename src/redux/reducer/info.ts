import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { InfoStateType, LoginStatus } from 'redux/types/reducerTypes';

const initialState: InfoStateType = {
  isMobile: false,
  baseInfo: {
    rpcUrl: '',
  },
  theme: 'light',
  discoverInfo: null,
  walletInfo: null,
  accountInfoSync: null,
  loginStatus: LoginStatus.UNLOGIN,
};

// Actual Slice
export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setDiscoverInfo(state, action) {
      state.discoverInfo = action.payload;
    },
    setWalletInfo(state, action) {
      state.walletInfo = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setAccountInfoSync(state, action) {
      state.accountInfoSync = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.info,
      };
    },
  },
});

export const { setIsMobile, setDiscoverInfo, setLoginStatus, setWalletInfo, setAccountInfoSync } = infoSlice.actions;
export const selectInfo = (state: AppState) => state.info;
export default infoSlice.reducer;
