import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IServerConfig } from 'types';

const initialState: {
  serverConfigInfo: IServerConfig | undefined;
} = {
  serverConfigInfo: undefined,
};

// Actual Slice
export const serverConfigInfoSlice = createSlice({
  name: 'serverConfigInfo',
  initialState,
  reducers: {
    setServerConfigInfo(state, action) {
      state.serverConfigInfo = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.serverConfigInfo,
      };
    },
  },
});

export const { setServerConfigInfo } = serverConfigInfoSlice.actions;
export const getConfigInfo = (state: AppState) => state.configInfo.configInfo;
export default serverConfigInfoSlice.reducer;
