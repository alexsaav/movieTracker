import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/Movies/moviesSlice'
import movieReducer from '../features/Movie/movieSlice';
import movieCreditsReducer from '../features/MovieCredits/movieCreditsSlice';
import personDetailReducer from '../features/People/personSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        movieCredits: movieCreditsReducer,
        personDetails: personDetailReducer
    },
});
