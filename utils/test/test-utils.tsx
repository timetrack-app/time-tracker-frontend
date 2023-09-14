import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../stores/store';
import { lightTheme } from '../../config/styles/colorThemes';

// https://testing-library.com/docs/react-testing-library/setup/
const AllTheProviders: React.FC = (
  {
    children,

  }: {
    children?: React.ReactNode

  },
) => (
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  </Provider>
);

// https://testing-library.com/docs/react-testing-library/setup/
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
