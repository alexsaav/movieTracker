import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
//Search Movie endpoint
const searchMovieEndpoint = '/search/movie';


// SEARCH MOVIES
export const searchMovies = createAsyncThunk(
    'movies/searchMovies',

    async ({title, page = 1}) => {
        const urlToFetch = new URL(`${tmdbBaseUrl}${searchMovieEndpoint}`)

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        if (title !== "") {
            urlToFetch.searchParams.append("query", title)
        }
        
        urlToFetch.searchParams.append("page", page)
        urlToFetch.searchParams.append("include_adult", "false")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movies = await response.json();
            return { movies };
            
        }
        
    }
);

//GET LATEST MOVIES
//GET TOP RATED MOVIES
//GET UPCOMING MOVIES
//GET NOW PLAYING MOVIES
//GET RELEASE DATES 
//GET RECOMMENDATIONS


// SLICE
export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            page: 0,
            results: [],
            total_pages: 0 
        } 
    },
    extraReducers: {
        [searchMovies.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});


export const selectSearchMovies = state => state.movies;
export default moviesSlice.reducer;