import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Tab } from '../../types/entity';
import { initialTabs } from '../../const/initialTabsState';

type SelectedTabState = Tab;

const initialState: SelectedTabState = initialTabs[0];

const selectedTabSlice = createSlice({
  name: 'selectedTab',
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<SelectedTabState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.displayOrder = action.payload.displayOrder;
      state.lists = action.payload.lists;
    },
  },
});

export const selectCurrentSelectedTab = (state: RootState) => state.selectedTab;

export const { updateSelectedTab } = selectedTabSlice.actions;

export default selectedTabSlice.reducer;
