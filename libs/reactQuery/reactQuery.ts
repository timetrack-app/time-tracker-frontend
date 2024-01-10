import { QueryClient } from 'react-query';
import { globalOnErrorHandler } from './globalOnErrorHandler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      refetchOnWindowFocus: false,
      retry: false,
      onError: globalOnErrorHandler,
    },
  },
});
