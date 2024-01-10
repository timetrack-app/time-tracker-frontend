import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type ActiveTaskState = {
  tabId: number | null;
  listId: number | null;
  id: number | null; // null when nothing is active
  name: string;
  totalTime: number;
  isTimerRunning: boolean;
};

const initialState: ActiveTaskState = {
  tabId: null,
  listId: null,
  id: null,
  name: '',
  totalTime: 0,
  isTimerRunning: false,
};

const activeTaskSlice = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    resetActiveTask: (state) => {
      state.name = '';
      state.totalTime = 0;
      state.isTimerRunning = false;
    },
    resetTimer: (state) => {
      state.totalTime = 0;
      state.isTimerRunning = false;
    },
    updateActiveTask: (state, action: PayloadAction<ActiveTaskState>) => {
      return action.payload;
    },
    updateActiveTaskName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateIsTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isTimerRunning = action.payload;
    },
    updateElapsedSeconds: (state, action: PayloadAction<number>) => {
      state.totalTime = action.payload;
    },
    incrementElapsedSeconds: (state) => {
      state.totalTime += 1;
    },
  },
});

// selectors
export const selectActiveTask = (state: RootState) => state.activeTask;

// actions
export const {
  resetActiveTask,
  updateActiveTask,
  updateActiveTaskName,
  updateIsTimerRunning,
  incrementElapsedSeconds,
  updateElapsedSeconds,
  resetTimer,
} = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
