import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = '539fce852ca8a629fa1befc64f16d988';
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
//Search Movie endpoint
const searchMovieEndpoint = '/search/movie';


// SEARCH MOVIES
export const searchMoviesAsync = createAsyncThunk(
    'movies/searchMoviesAsync',

    async (payload) => {
        const page = (page = 1) => `${page}`;
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
    reducers: {
        setSearchMovies: (state, action) => {
            return action.payload;
        },
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