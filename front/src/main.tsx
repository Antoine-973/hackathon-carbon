import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import Router from './rooter/Router'
import './index.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import AuthProvider from "./providers/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f44336',
        },
        secondary: {
            main: '#3f51b5',
        }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <AuthProvider>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                    <Router />
              </BrowserRouter>
          </ThemeProvider>
      </AuthProvider>
  </StrictMode>,
)
