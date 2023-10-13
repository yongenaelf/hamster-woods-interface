import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IConfigItems } from 'types';
import contractRequest from 'contract/contractRequest';

const initialState: {
  configInfo: IConfigItems | undefined;
} = {
  configInfo: undefined,
};

// Actual Slice
export const configInfoSlice = createSlice({
  name: 'configInfo',
  initialState,
  reducers: {
    setConfigInfo(state, action) {
      state.configInfo = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.configInfo,
      };
    },
  },
});

export const { setConfigInfo } = configInfoSlice.actions;
export const getConfigInfo = (state: AppState) => state.configInfo.configInfo;
export default configInfoSlice.reducer;
