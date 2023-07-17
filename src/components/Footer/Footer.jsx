import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { darkTheme } from '../../util/theme';

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
            </Box>
        </ThemeProvider>
    )
}

export default Footer