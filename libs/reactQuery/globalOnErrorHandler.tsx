import Router from 'next/router'; // https://github.com/vercel/next.js/discussions/17046
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import styled from 'styled-components';
import { showToast } from '../react-toastify/toast';
import { getWebRoute } from '../../routes/web';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const showErrorToast = (message: string | JSX.Element) => {
  showToast('error', message);
};

/**
 *
 *
 * @param {unknown} error
 * @return {void}
 */
export const globalOnErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    const status = error?.response?.status;

    switch (status) {
      case 401:
        showErrorToast(
          <Container>
            Your session has expired.
            <br />
            Please log in again.
          </Container>,
        );

        toast.onChange((toastItem) => {
          if (toastItem.status === 'removed') {
            Router.push(getWebRoute('login'));
          }
        });

        return;
      default:
        showErrorToast('An error has occurred.');
    }
  }
};
