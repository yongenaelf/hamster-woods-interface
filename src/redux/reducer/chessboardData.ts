import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IChessboardData } from 'types';
import { CheckerboardNode } from 'pageComponents/Recreation/checkerboard';

const initialState: {
  chessboardData: IChessboardData | undefined;
  resetStart: boolean;
  curChessboardNode?: CheckerboardNode;
} = {
  chessboardData: undefined,
  resetStart: true,
};

// Actual Slice
export const chessboardDataSlice = createSlice({
  name: 'chessboardData',
  initialState,
  reducers: {
    setChessboardData(state, action) {
      state.chessboardData = action.payload;
    },
    setChessboardResetStart(state, action) {
      state.resetStart = action.payload;
    },
    setCurChessboardNode(state, action) {
      state.curChessboardNode = action.payload;
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

export const { setChessboardData, setChessboardResetStart, setCurChessboardNode } = chessboardDataSlice.actions;
export const getChessboardData = (state: AppState) => state.chessboardData.chessboardData?.data;
export const getImageResources = (state: AppState) => state.chessboardData.chessboardData?.imageResources;
export const getCurChessboardNode = (state: AppState) => state.chessboardData.curChessboardNode;
export const getResetStart = (state: AppState) => state.chessboardData.resetStart;

export default chessboardDataSlice.reducer;
