import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config.json'

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;

//SEARCH MULTI (multi search lets you search for movies, TV shows and people in a single request.)
export const searchMulti = createAsyncThunk(
    'search/searchMulti',

    async ({name, page = 1}) => {
        //Search Multi endpoint
        const searchMultiEndpoint = '/search/multi';
        const urlToFetch = new URL(`${config.tmdbBaseUrl}${searchMultiEndpoint}`)

        //query params
        if (name !== "") {
            urlToFetch.searchParams.append("query", name)
        }
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("include_adult", "false")
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const multiSearch = await response.json();
            return multiSearch;
        }
    }
);



// SLICE
export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        page: 1,
        total_pages: 0,
        isLoading: false,
        movies: [],
        people: []
    },
    extraReducers: {
        [searchMulti.pending]: (state, action) => {
            state.isLoading = true;
        },
        [searchMulti.fulfilled]: (state, action) => {
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
            state.movies = action.payload.results.filter(result =>  result.media_type === 'movie');
            state.people = action.payload.results.filter(result =>  result.media_type === 'person');

        },
    }
});

//SELECTORS
export const selectMovies = state => state.search.movies;
export const selectPeople = state => state.search.people;
export const selectSearchResults = state => state.search;

//REDUCER
export default searchSlice.reducer;