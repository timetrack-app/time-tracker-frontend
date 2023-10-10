// https://redux-toolkit.js.org/tutorials/typescript

import { configureStore } from '@reduxjs/toolkit';

// reducers
import colorThemeReducer from './slices/colorThemeSlice';
import activeTaskReducer from './slices/activeTaskSlice';
import workSessionReducer from './slices/workSessionSlice';
import selectedTabReducer from './slices/selectedTabSlice';

export const store = configureStore({
  reducer: {
    colorTheme: colorThemeReducer,
    activeTask: activeTaskReducer,
    workSession: workSessionReducer,
    selectedTab: selectedTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
