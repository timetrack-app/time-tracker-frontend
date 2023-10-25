import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Tab } from '../../types/entity';

type SelectedTabState = Tab;

const initialState: SelectedTabState = {
  id: null,
  name: '',
  displayOrder: null,
  taskLists: [],
};

const selectedTabSlice = createSlice({
  name: 'selectedTab',
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<SelectedTabState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.displayOrder = action.payload.displayOrder;
      state.taskLists = action.payload.taskLists;
    },
  },
});

export const selectCurrentSelectedTab = (state: RootState) => state.selectedTab;

export const { updateSelectedTab } = selectedTabSlice.actions;

export default selectedTabSlice.reducer;
