import * as React from 'react';
import { Outlet } from 'react-router'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { darkTheme } from '../util/theme';

import { ThemeProvider } from '@mui/material/styles';

const Layout = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar />

                <Box component="main" sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                    <Toolbar />
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default Layout