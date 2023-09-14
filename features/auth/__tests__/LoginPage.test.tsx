import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../../stores/store';
import '@testing-library/jest-dom'
import {
  render,
  screen,
  fireEvent,
  act,
  RenderOptions,
} from '@testing-library/react';
import LoginPage from '../../../components/pages/login/LoginPage';
import { lightTheme } from '../../../config/styles/colorThemes';
import { getWebRoute } from '../../../routes/web';
import { emailRequired, passwordRequired } from '../../../const/validation/messages';
import { showToast } from '../../../libs/react-toastify/toast';

jest.mock('../../../hooks/useColorTheme.ts', () => ({
  useColorTheme: () => {
    return {
      setColorTheme: () => {},
      initColorTheme: () => {},
      getCurrentColorThemeStyle: () => lightTheme,
    }
  }
}));

// Mock useRouter for testing
const useRouterMock = useRouter as jest.Mock;
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock useUserLogin hook
jest.mock('../api/hooks/useUserLogin.ts', () => ({
  useUserLogin: () => ({
    isLoading: false,
    mutate: async (
      values: { email: string; password: string },
      {
        onSuccess,
        onError,
      }: { onSuccess: (response: { token: string }) => void; onError: () => void },
    ) => {
      if (values.email === 'test@example.com' && values.password === 'password123') {
        // Simulate a successful login with a mock token
        const mockResponse = { token: 'mock-token' };
        onSuccess(mockResponse);
      } else {
        // Simulate an error for other cases
        onError();
      }
    },
  }),
}));

// Mock showToast
jest.mock('../../../libs/react-toastify/toast');

// https://testing-library.com/docs/react-testing-library/setup/
const AllTheProviders: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        {children}
      </ThemeProvider>
    </Provider>
  )
}

// https://testing-library.com/docs/react-testing-library/setup/
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

describe('Login Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouterMock.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Redirect to home page after successful form submission', async () => {
    customRender(<LoginPage />);

    // Fill in the form fields with correct credentials
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Wait for the asynchronous behavior to complete
    await act(async () => {});

    // Ensure that the router push function was called with the correct route
    expect(mockRouter.push).toHaveBeenCalledWith(getWebRoute('home'));
  });

  it('Show error with invalid form values', async () => {
    customRender(<LoginPage />);

    // Fill in the form fields with incorrect credentials
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'invalidpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Wait for the asynchronous behavior to complete
    await act(async () => {});

    // Ensure that the router push function was not called for the error case
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith('error', 'An error has occurred.');
  });

  it ('Show validation messages with invalid form values', async () => {
    customRender(<LoginPage />);

        // Fill in the form fields with incorrect credentials
        fireEvent.change(screen.getByLabelText('E-mail'), {
          target: { value: '' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: '' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Login'));

        await act(async () => {});

        expect(screen.getByText(emailRequired)).toBeInTheDocument();
        expect(screen.getByText(passwordRequired)).toBeInTheDocument();
  })
});
