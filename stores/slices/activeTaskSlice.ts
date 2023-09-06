import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type ActiveTaskState = {
  name: string
  elapsedSeconds: number
  isTimerRunning: boolean
};

const initialState: ActiveTaskState = {
  name: '',
  elapsedSeconds: 0,
  isTimerRunning: false,
};

const activeTaskSlice = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    resetActiveTask: (state) => {
      state.name = '';
      state.elapsedSeconds = 0;
      state.isTimerRunning = false;
    },
    resetTimer: (state) => {
      state.elapsedSeconds = 0;
      state.isTimerRunning = false;
    },
    updateActiveTaskName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateIsTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isTimerRunning = action.payload;
    },
    updateElapsedSeconds: (state, action: PayloadAction<number>) => {
      state.elapsedSeconds = action.payload;
    },
    incrementElapsedSeconds: (state) => {
      state.elapsedSeconds += 1;
    },
  },
});

// selectors
export const selectActiveTask = (state: RootState) => state.activeTask;

// actions
export const {
  resetActiveTask,
  updateActiveTaskName,
  updateElapsedSeconds,
  updateIsTimerRunning,
  incrementElapsedSeconds,
  resetTimer,
} = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
