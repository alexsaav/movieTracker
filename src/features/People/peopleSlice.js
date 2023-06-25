import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config.json'

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;

// GET POPULAR PEOPLE (ALSO GETS WHAT THAT PEOPLE IS KNOWN FOR)
export const getPopularPeople = createAsyncThunk(
    "people/getPopularPeople",

    async(page) => {
        const getPopularPeopleEndpoint = "/person/popular";

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${getPopularPeopleEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const popularPeople = await response.json();
            console.log(popularPeople)
            return popularPeople;
        }
    }
);

// SLICE
export const people = createSlice({
    name: "people",
    initialState: {
        page: 1,
        results: [],
        total_pages: 1,
        isLoading: false
    },
    extraReducers: {
        [getPopularPeople.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getPopularPeople.fulfilled]: (state, action) => {
            return action.payload;
        },
    }
});

//SELECTORS
export const selectPopularPeople = state => state.people;

//REDUCER
export default people.reducer;