import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type WorkSessionState = {
  isActive: boolean
};

const initialState: WorkSessionState = {
  isActive: false,
};

const workSessionSlice = createSlice({
  name: 'workSession',
  initialState,
  reducers: {
    updateIsWorkSessionActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

// selectors
export const selectIsWorkSessionActive = (state: RootState) => state.workSession.isActive;

// actions
export const {
  updateIsWorkSessionActive,
} = workSessionSlice.actions;

export default workSessionSlice.reducer;
