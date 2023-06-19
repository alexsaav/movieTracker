import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format, add } from "date-fns";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = "https://api.themoviedb.org/3";

// SEARCH MOVIES
export const searchMovies = createAsyncThunk(
    "search/searchMovies",

    async ({title, page = 1}) => {
        //Search Movie endpoint
        const searchMovieEndpoint = "/search/movie";
        
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
            return movies;
        }
        
    }
);

//SEARCH PEOPLE
export const searchPeople = createAsyncThunk(
    'search/searchPeople',

    async ({name, page = 1}) => {
        //Search People endpoint
        const searchPeopleEndpoint = '/search/people';
        const urlToFetch = new URL(`${tmdbBaseUrl}${searchPeopleEndpoint}`)

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        if (name !== "") {
            urlToFetch.searchParams.append("query", name)
        }
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page)
        urlToFetch.searchParams.append("include_adult", "false")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const people = await response.json();
            return people;
        }
    }
);

//SEARCH MULTI (multi search lets you search for movies, TV shows and people in a single request.)
export const searchMulti = createAsyncThunk(
    'search/searchMulti',

    async ({name, page = 1}) => {
        //Search Multi endpoint
        const searchMultiEndpoint = '/search/multi';
        const urlToFetch = new URL(`${tmdbBaseUrl}${searchMultiEndpoint}`)

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
    /*     [searchMovies.pending]: (state, action) => {
            state.movies.isLoading = true;
        },
        [searchMovies.fulfilled]: (state, action) => {
            state.movies = action.payload;
        },
        [searchPeople.pending]: (state, action) => {
            state.people.isLoading = true;
        },
        [searchPeople.fulfilled]: (state, action) => {
            state.people = action.payload;
        }, */
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
//export const selectSearchMovies = state => state.search.movies;
//export const selectSearchPeople = state => state.search.people;
export const selectMovies = state => state.search.movies;
export const selectPeople = state => state.search.people;
export const selectSearchResults = state => state.search;

//REDUCER
export default searchSlice.reducer;