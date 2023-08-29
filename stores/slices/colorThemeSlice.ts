import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// "type" is needed. If no "type", circular dependency error arise
// https://stackoverflow.com/questions/63923025/how-to-fix-circular-dependencies-of-slices-with-the-rootstate
import type { RootState } from '../store';
import { ColorThemeName } from '../../types/colorTheme';

type ColorThemeState = {
  theme: ColorThemeName
};

const initialState: ColorThemeState = {
  theme: 'light',
};

const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    updateColorTheme: (state, action: PayloadAction<ColorThemeName>) => {
      state.theme = action.payload;
    },
  },
});

// selectors
export const selectColorTheme = (state: RootState) => state.colorTheme;
export default colorThemeSlice.reducer;

// actions
export const {
  updateColorTheme,
} = colorThemeSlice.actions;
