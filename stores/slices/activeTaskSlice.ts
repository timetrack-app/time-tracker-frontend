import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type ActiveTaskState = {
  name: string
  elapsedSeconds: number
};

const initialState: ActiveTaskState = {
  name: '',
  elapsedSeconds: 0,
};

const activeTaskSlice = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    updateActiveTask: (state, action: PayloadAction<ActiveTaskState>) => {
      state.name = action.payload.name;
      state.elapsedSeconds = action.payload.elapsedSeconds;
    },
  },
});

// selectors
export const selectActiveTask = (state: RootState) => state.activeTask;

// actions
export const {
  updateActiveTask,
} = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
