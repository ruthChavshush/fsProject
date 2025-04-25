import { QueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

const useGetRootQueryClient = () => {
  // const navigate = useNavigate();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            throwOnError: (error: any) => {
              const status = error.response?.status;
              return (
                status &&
                (status >= StatusCodes.INTERNAL_SERVER_ERROR ||
                  status === StatusCodes.TOO_MANY_REQUESTS)
              );
            },
          },
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            throwOnError: (error: any) => {
              const status = error.response?.status;
              if (
                status === StatusCodes.UNAUTHORIZED
                // && window.location.pathname !== `${BASE_PATH}/unauthorized`
              ) {
                // navigate(`${BASE_PATH}/unauthorized`);
                return;
              }
              return (
                status &&
                (status >= StatusCodes.INTERNAL_SERVER_ERROR ||
                  status === StatusCodes.TOO_MANY_REQUESTS)
              );
            },
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return queryClient;
};

export default useGetRootQueryClient;
