import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/Movies/moviesSlice'
import movieDetailsReducer from '../features/MovieDetails/movieDetailsSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movieDetails: movieDetailsReducer,
    },
});
