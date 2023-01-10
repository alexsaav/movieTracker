import { create } from "@mui/material/styles/createTransitions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// GET PERSON DETAILS
export const getPersonDetailsAsync = createAsyncThunk(
    "person/getPersonDetailsAsync",

    async(id) => {
        const personDetailsEndpoint = `/person/${id}`;
        
        const urlToFetch = new URL(`${tmdbBaseUrl}${personDetailsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const personDetails = await response.json();
            return personDetails;
            
        }
    }
);

//GET IMAGES
export const getPersonImages = createAsyncThunk(
    "person/getPersonImages",

    async(personId) => {
        const getImagesEndpoint = `/person/${personId}/images`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${getImagesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const personImages = await response.json();
            return personImages;
        }
    }
);

export const getPersonTaggedImages = createAsyncThunk(
    "person/getPersonTaggedImages",

    async({personId, page = 1}) => {
        const getTaggedImagesEndpoint = `/person/${personId}/tagged_images`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${getTaggedImagesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const personTaggedImages = await response.json();
            return personTaggedImages;
        }
    }
);

// GET MOVIE AND SERIES CREDITS
export const getCombinedCredits = createAsyncThunk(
    "person/getCombinedCredits",

    async(personId) => {
        const getCombinedCreditsEndpoint = `/person/${personId}/combined_credits`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${getCombinedCreditsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const combinedCredits = await response.json();
            combinedCredits.cast.sort((a, b) => {
                const aDate = a.release_date ?? a.first_air_date;
                const bDate = b.release_date ?? b.first_air_date;
                if (!aDate) return 1;
                if (!bDate) return -1
               
                var dateA = new Date(aDate);
                var dateB = new Date(bDate);
                return dateB - dateA;  
            })

            return combinedCredits;
        }
    }
);

// GET POPULAR PEOPLE (ALSO GETS WHAT THAT PEOPLE IS KNOWN FOR)
export const getPopularPeople = createAsyncThunk(
    "people/getPopularPeople",

    async(page) => {
        const getPopularPeopleEndpoint = "/person/popular";

        const urlToFetch = new URL(`${tmdbBaseUrl}${getPopularPeopleEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const popularPeople = await response.json();
            return popularPeople;
        }
    }
);

//GET /search/person


// SLICE
export const person = createSlice({
    name: "person",
    initialState: {
        personDetails: {
            name: "",
            biography: ""
        },
        personImages: {
            profiles: []
        },
        personTaggedImages: {
            results: []
        },
        combinedCredits: {
            cast: [],
            crew: [
                {
                    release_date: ""
                }
            ]
        },
        popularPeople: {
            page: 1,
            results: [{
                known_for: []
            }],
            total_pages: 1
        }
    },
    extraReducers: {
        [getPersonDetailsAsync.fulfilled]: (state, action) => {
            state.personDetails = action.payload;
        },
        [getPersonImages.fulfilled]: (state, action) => {
            state.personImages = action.payload;
        },
        [getPersonTaggedImages.fulfilled]: (state, action) => {
            state.personTaggedImages = action.payload;
        },
        [getCombinedCredits.fulfilled]: (state, action) => {
            state.combinedCredits = action.payload;
        },
        [getPopularPeople.fulfilled]: (state, action) => {
            state.popularPeople = action.payload;
        },
    }
});

//SELECTORS
export const selectPersonDetails = state => state.person.personDetails;
export const selectPersonImages = state => state.person.personImages;
export const selectPersonTaggedImages = state => state.person.personTaggedImages;
export const selectCombinedCredits = state => state.person.combinedCredits;
export const selectPopularPeople = state => state.person.popularPeople;

//REDUCER
export default person.reducer;