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
        }
    }
});

//SELECTORS
export const selectPersonDetails = state => state.person.personDetails;
export const selectPersonImages = state => state.person.personImages;
export const selectPersonTaggedImages = state => state.person.personTaggedImages;

//REDUCER
export default person.reducer;