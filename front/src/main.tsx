import ReactDOM from 'react-dom/client'
import Router from './rooter/Router'
import './index.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import AuthProvider from "./providers/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./layouts/Header";
import Box from "@mui/material/Box";
import {useLayoutEffect, StrictMode} from "react";
import {useLocation} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FDFDFD',
            dark: '#FDFDFD',
        },
        secondary: {
            main: '#282C2B',
            dark: '#282C2B',
        },
        success: {
            main: '#00A99D',
            dark: '#00A99D',
        },
        info: {
            main :'#5B98D2',
            dark: '#5B98D276',
        },
        error: {
            main:'#E53F49',
            dark: '#E53F49',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
    }
});

interface Props {
    children: Element | null
}

const Wrapper = ({children} : Props) => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <AuthProvider>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Wrapper>
                      <Header/>
                      <Box  sx={{paddingTop:'100px'}} >
                          <Router >
                          </Router>
                      </Box>
                  </Wrapper>
              </BrowserRouter>
          </ThemeProvider>
      </AuthProvider>
  </StrictMode>,
)
