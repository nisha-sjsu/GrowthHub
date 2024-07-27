import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { Box, CssBaseline } from '@mui/material';
import { Helmet } from 'react-helmet';
import { AuthProvider } from './hooks/useAuth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RouterContent from './Router';

function App() {
  // console.log(process.env.REACT_APP_OPENAI_API_KEY);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Helmet>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <Box>
              <RouterContent />
            </Box>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
