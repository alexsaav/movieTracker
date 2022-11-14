import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';


// GET MOVIE DETAILS
export const getMovieDetailsAsync = createAsyncThunk(
    'movieDetails/getMovieDetailsAsync',

    async({id}) => {
        //Get Movie Details Endpoint
        const movieDetailsEndpoint = `/movie/${id}`;
        const urlToFetch = new URL(`${tmdbBaseUrl}${movieDetailsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movieDetails = await response.json();
            return { movieDetails };
        }
    }
);

// SLICE
export const movieDetails = createSlice({
    name: 'movieDetails',
    initialState: {
        movieDetails: {},
    },
    extraReducers: {
        [getMovieDetailsAsync.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export const selectMovieDetails = state => state.movieDetails;
export default movieDetails.reducer;