import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type WorkSessionState = {
  hasStarted: boolean
};

const initialState: WorkSessionState = {
  hasStarted: false,
};

const workSessionSlice = createSlice({
  name: 'workSession',
  initialState,
  reducers: {
    updateStartStatus: (state, action: PayloadAction<boolean>) => {
      state.hasStarted = action.payload;
    },
  },
});

// selectors
export const selectStartStatus = (state: RootState) => state.workSession.hasStarted;

// actions
export const {
  updateStartStatus,
} = workSessionSlice.actions;

export default workSessionSlice.reducer;
