import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { pageItemLimitInTemplateList } from '../../const/dashboard';

type DashboardTemplatePaginationState = {
  currentPage: number
  limit: number
};

const initialState: DashboardTemplatePaginationState = {
  currentPage: 1,
  limit: pageItemLimitInTemplateList,
};

const dashboardTemplatePaginationSlice = createSlice({
  name: 'dashboardTemplatePagination',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectCurrentPage = (state: RootState) => state.dashboardTemplatePagination.currentPage;
export const selectLimit = (state: RootState) => state.dashboardTemplatePagination.limit;

export const {
  changePage,
} = dashboardTemplatePaginationSlice.actions;

export default dashboardTemplatePaginationSlice.reducer;
