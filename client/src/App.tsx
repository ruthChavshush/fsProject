import Router from '@/router/router';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from './Theme';
import useGetRootQueryClient from './hooks/useGetrRootQueryClient';

function App() {
  const queryClient = useGetRootQueryClient();
  const clientId = import.meta.env.VITE_FIREBASE_CLIENT_ID;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={clientId}>
          <CssBaseline>
            <Stack
              sx={{
                minHeight: '100vh',
              }}
            >
              <Router />
            </Stack>
          </CssBaseline>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
