import * as React from 'react';
import { Outlet } from 'react-router'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../../features/util/theme';

const Layout = () => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <NavBar />
            </ThemeProvider>
            <Box component='main' sx={{width: '100%'}}>
                <Toolbar />
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout

