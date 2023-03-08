import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/Movies/moviesSlice'
import movieReducer from '../features/Movie/movieSlice';
import movieCreditsReducer from '../features/MovieCredits/movieCreditsSlice';
import personReducer from '../features/People/personSlice';
import userReducer from '../features/User/userSlice';
import authReducer from '../features/User/authSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        movieCredits: movieCreditsReducer,
        person: personReducer,
        auth: authReducer,
        user: userReducer
    },
});
