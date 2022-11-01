import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
//Search Movie endpoint
const searchMovieEndpoint = '/search/movie';


// SEARCH MOVIES
export const searchMoviesAsync = createAsyncThunk(
    'movies/searchMoviesAsync',

    async (payload) => {
        //query params
        const requestParams = `?api_key=${tmdbKey}&language=en-US&query=${payload}&page=1&include_adult=false`;
        
        //this is the URL where we’ll send our fetch request
        const urlToFetch = `${tmdbBaseUrl}${searchMovieEndpoint}${requestParams}`;

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movies = await response.json();
            //console.log(movies)
            return { movies };
        }
    }
);


// SLICE
export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            results: [] 
        } 
    },
    extraReducers: {
        [searchMoviesAsync.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export const { setSearchMovies } = moviesSlice.actions;

export const selectSearchMovies = state => state.movies;
export default moviesSlice.reducer;