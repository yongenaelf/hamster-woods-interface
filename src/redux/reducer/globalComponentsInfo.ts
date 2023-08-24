import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { GlobalComponentsInfoStateType, PageLoadingType } from 'redux/types/reducerTypes';

const initialState: GlobalComponentsInfoStateType = {
  pageLoading: {
    open: false,
  },
};

// Actual Slice
export const globalComponentsInfoSlice = createSlice({
  name: 'globalComponentsInfo',
  initialState,
  reducers: {
    setPageLoading(state, action) {
      state.pageLoading = {
        ...action.payload,
      };
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.globalComponentsInfo,
      };
    },
  },
});

export const { setPageLoading } = globalComponentsInfoSlice.actions;
export const getPageLoading = (state: AppState): PageLoadingType => state.globalComponentsInfo.pageLoading;
export default globalComponentsInfoSlice.reducer;
