import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const container = document.getElementById('root');
const root = createRoot(container);

const theme = createTheme({
    breakpoints: {
        values: {
            xxs: 350,
            xs: 500,
            sm: 740,
            md: 1024,
            lg: 1200,
        },
    },
  });

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
