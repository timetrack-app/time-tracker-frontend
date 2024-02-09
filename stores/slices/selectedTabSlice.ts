import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Tab } from '../../types/entity';

type SelectedTabState = Tab;

const initialState: Tab = {
  id: 0,
  name: '',
  displayOrder: 0,
  lists: [],
};

const selectedTabSlice = createSlice({
  name: 'selectedTab',
  initialState,
  reducers: {
    setInitialSelectedTab: (state, action: PayloadAction<SelectedTabState>) => {
      state = action.payload;
    },
    updateSelectedTab: (state, action: PayloadAction<SelectedTabState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.displayOrder = action.payload.displayOrder;
      state.lists = action.payload.lists;
    },
  },
});

export const selectCurrentSelectedTab = (state: RootState): SelectedTabState =>
  state.selectedTab;

export const { updateSelectedTab, setInitialSelectedTab } =
  selectedTabSlice.actions;

export default selectedTabSlice.reducer;
