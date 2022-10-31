import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/Movies/moviesSlice'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});
