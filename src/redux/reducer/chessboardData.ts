import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IChessboardData } from 'types';

const initialState: {
  chessboardData: IChessboardData | undefined;
} = {
  chessboardData: undefined,
};

// Actual Slice
export const chessboardDataSlice = createSlice({
  name: 'chessboardData',
  initialState,
  reducers: {
    setChessboardData(state, action) {
      state.chessboardData = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.chessboardData,
      };
    },
  },
});

export const { setChessboardData } = chessboardDataSlice.actions;
export const getChessboardData = (state: AppState) => state.chessboardData.chessboardData?.data;
export const getImageResources = (state: AppState) => state.chessboardData.chessboardData?.imageResources;
export default chessboardDataSlice.reducer;
