import * as React from 'react';
import { Outlet } from 'react-router'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { darkTheme } from '../../features/util/theme';
import { grey, pink } from '@mui/material/colors';

import { ThemeProvider } from '@mui/material/styles';

//check this
const color = grey[500];

const Layout = () => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <NavBar />
            </ThemeProvider>
            <Box component='main'>
                <Toolbar />
                <Toolbar />
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout

/* const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ThemeProvider theme={darkTheme}>
                <NavBar />
            </ThemeProvider>

            <Box component="main" sx={{ p: 4, display: 'flex', flexDirection: 'column' }} >
                <Toolbar />
                <Outlet />
            </Box>

            <Footer />
        </Box>
    )
} */