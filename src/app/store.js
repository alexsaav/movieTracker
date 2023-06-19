import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/Movies/moviesSlice'
import movieReducer from '../features/Movie/movieSlice';
import movieCreditsReducer from '../features/MovieCredits/movieCreditsSlice';
import personReducer from '../features/Person/personSlice';
import peopleReducer from '../features/People/peopleSlice'
//import userReducer from '../features/User/userSlice';
//import authReducer from '../features/User/authSlice';
import searchReducer from '../components/SearchBar/searchSlice'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        movieCredits: movieCreditsReducer,
        person: personReducer,
        people: peopleReducer,
        search: searchReducer,
        //auth: authReducer,
        //user: userReducer
    },
});
