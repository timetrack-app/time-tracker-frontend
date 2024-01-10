import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type WorkSessionState = {
  workSessionId: number;
  isWorkSessionActive: boolean;
};

const initialState: WorkSessionState = {
  workSessionId: null,
  isWorkSessionActive: false,
};

const workSessionSlice = createSlice({
  name: 'workSession',
  initialState,
  reducers: {
    updateIsWorkSessionActive: (state, action: PayloadAction<boolean>) => {
      state.isWorkSessionActive = action.payload;
    },
    updateWorkSessionId: (state, action: PayloadAction<number>) => {
      state.workSessionId = action.payload;
    },
  },
});

// selector
export const selectWorkSessionState = (state: RootState): WorkSessionState =>
  state.workSession;

// actions
export const { updateIsWorkSessionActive, updateWorkSessionId } =
  workSessionSlice.actions;

export default workSessionSlice.reducer;
