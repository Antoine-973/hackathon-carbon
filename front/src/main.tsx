import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import Router from './rooter/Router'
import './index.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import AuthProvider from "./providers/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./layouts/Header";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FDFDFD',
        },
        secondary: {
            main: '#282C2B',
        },
        success: {
            main: '#00A99D',
        },
        info: {
            main :'#5B98D2',
            dark: '#5B98D276',
        },
        error: {
            main:'#E53F49'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
)
