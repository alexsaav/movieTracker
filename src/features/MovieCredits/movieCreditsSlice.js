import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config.json'

// GET MOVIE CREDITS
export const getMovieCreditsAsync = createAsyncThunk(
    'movieCast/getMovieCreditsAsync',
    
    async(id) => {
        const movieCreditsEndpoint = `/movie/${id}/credits`;

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${movieCreditsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movieCredits = await response.json();
            return { movieCredits };
        }
    }
);

// SLICE
export const movieCredits = createSlice({
    name: 'movieCredits',
    initialState: {
        cast: [],
        crew:[],
        isLoading: false
    },
    extraReducers: {
        [getMovieCreditsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getMovieCreditsAsync.fulfilled]: (state, action) => {
            return action.payload.movieCredits;
        }
    }
});

export const selectMovieCredits = state => state.movieCredits;
export default movieCredits.reducer;