"use client"

import { ThemeProvider, CssBaseline, Switch, FormControlLabel } from "@mui/material";
import theme from "@/styles/theme";


export default function ThemeProviders({ children }: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={ theme }>  <CssBaseline /> { children }</ThemeProvider>

    )
}