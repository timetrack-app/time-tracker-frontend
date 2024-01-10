import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// "type" is needed. If no "type", circular dependency error arise
// https://stackoverflow.com/questions/63923025/how-to-fix-circular-dependencies-of-slices-with-the-rootstate
import type { RootState } from '../store';
import { ColorThemeName } from '../../types/colorTheme';
import { defaultColorThemeName } from '../../const/colorTheme';

type ColorThemeState = {
  theme: ColorThemeName
  isInit: boolean
};

const initialState: ColorThemeState = {
  theme: defaultColorThemeName,
  isInit: false,
};

const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    updateColorTheme: (state, action: PayloadAction<ColorThemeName>) => {
      state.theme = action.payload;
    },
  },
});

// selectors
export const selectColorTheme = (state: RootState) => state.colorTheme.theme;
export const selectIsInit = (state: RootState) => state.colorTheme.isInit;

// actions
export const {
  init,
  updateColorTheme,
} = colorThemeSlice.actions;

export default colorThemeSlice.reducer;
