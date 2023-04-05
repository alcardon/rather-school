"use client"

import { ThemeProvider, CssBaseline, Switch, FormControlLabel } from "@mui/material";
import theme from "@/styles/theme";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function MuiThemeProvider({ children }: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={ theme }>
            <ToastContainer
                position="top-right"
                autoClose={ 3000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            /> <CssBaseline />
            { children }
        </ThemeProvider>

    )
}