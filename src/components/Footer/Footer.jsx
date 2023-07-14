import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { dark } from '@mui/material/styles/createPalette';
import { darkTheme } from '../../features/util/theme';

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MovieTracker
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};


const Footer = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[900],
                    bottom: '0px',
                    position: 'relative',

                }}
            >
                <Container maxWidth="sm" sx={{textAlign: 'center'}}>
                    {/* <Copyright /> */}
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Footer