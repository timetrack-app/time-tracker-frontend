import React from 'react';
import { render, fireEvent, screen, act } from '../../../utils/test/test-utils';
import SignUpPage from '../../../components/pages/signup/SignUpPage'; // Adjust the import path as needed
import { showToast } from '../../../libs/react-toastify/toast';

// mock showToast
jest.mock('../../../libs/react-toastify/toast/index.ts');

jest.mock('../../../features/auth/api/hooks/useUserRegistration.ts', () => ({
  useUserRegistration: () => ({
    isLoading: false,
    mutate: async (
      values: { email: string; password: string },
      {
        onSuccess,
        onError,
      }: { onSuccess: () => void; onError: () => void },
    ) => {
      if (values.email === 'test@example.com' && values.password === 'password123') {
        onSuccess();
      } else {
        onError();
      }
    },
  }),
}));

describe('SignUpPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Show success toast after signed up correctly', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Sign Up'));
    await act(async () => {});

    expect(showToast).toHaveBeenCalledWith('success', 'Verification email sent! Please check.');
  });

  it ('Show error toast after sign up failed', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123wrong' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123wrong' },
    });

    fireEvent.click(screen.getByText('Sign Up'));
    await act(async () => {});

    expect(showToast).toHaveBeenCalledWith('error', 'An error has occurred.');
  });
});
