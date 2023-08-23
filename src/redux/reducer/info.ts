import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { InfoStateType, LoginStatus } from 'redux/types/reducerTypes';
import { WalletType } from 'types';

const initialState: InfoStateType = {
  isMobile: false,
  baseInfo: {
    rpcUrl: '',
  },
  theme: 'light',
  walletInfo: null,
  walletType: WalletType.unknown,
  accountInfoSync: null,
  loginStatus: LoginStatus.UNLOGIN,
  showLeaderboard: false,
  showGameRecord: false,
};

// Actual Slice
export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setWalletInfo(state, action) {
      state.walletInfo = action.payload;
    },
    setWalletType(state, action) {
      state.walletType = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setAccountInfoSync(state, action) {
      state.accountInfoSync = action.payload;
    },
    setPlayerInfo(state, action) {
      state.playerInfo = action.payload;
    },
    toggleShowLeaderboard(state) {
      state.showLeaderboard = !state.showLeaderboard;
    },
    toggleShowGameRecord(state) {
      state.showGameRecord = !state.showGameRecord;
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

export const {
  setIsMobile,
  setLoginStatus,
  setWalletInfo,
  setAccountInfoSync,
  setWalletType,
  setPlayerInfo,
  toggleShowLeaderboard,
  toggleShowGameRecord,
} = infoSlice.actions;
export const selectInfo = (state: AppState) => state.info;
export default infoSlice.reducer;
