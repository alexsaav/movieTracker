import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from './../../config.json'

// GET PERSON DETAILS
export const getPersonDetailsAsync = createAsyncThunk(
    "person/getPersonDetailsAsync",

    async(id) => {
        const personDetailsEndpoint = `/person/${id}`;
        
        const urlToFetch = new URL(`${config.tmdbBaseUrl}${personDetailsEndpoint}`);

        //query params

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

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${getImagesEndpoint}`);

        //query params

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

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${getTaggedImagesEndpoint}`);

        //query params
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

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${getCombinedCreditsEndpoint}`);

        //query params
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

            combinedCredits.crew.sort((a, b) => {
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

//GET /search/person


// SLICE
export const person = createSlice({
    name: "person",
    initialState: {
        personDetails: {
            name: "",
            biography: "",
            isLoading: false,
        },
        personImages: {
            profiles: [],
            isLoading: false
        },
        personTaggedImages: {
            results: [],
            isLoading: false
        },
        combinedCredits: {
            cast: [],
            crew: [
                {
                    release_date: ""
                }
            ],
            isLoading: false
        },
    },
    extraReducers: {
        [getPersonDetailsAsync.pending]: (state, action) => {
            state.personDetails.isLoading = true;
        },
        [getPersonDetailsAsync.fulfilled]: (state, action) => {
            state.personDetails = action.payload;
        },

        [getPersonImages.pending]: (state, action) => {
            state.personImages.isLoading = true;
        },
        [getPersonImages.fulfilled]: (state, action) => {
            state.personImages = action.payload;
        },

        [getPersonTaggedImages.pending]: (state, action) => {
            state.personTaggedImages.isLoading = true;
        },
        [getPersonTaggedImages.fulfilled]: (state, action) => {
            state.personTaggedImages = action.payload;
        },

        [getCombinedCredits.pending]: (state, action) => {
            state.combinedCredits.isLoading = true;
        },
        [getCombinedCredits.fulfilled]: (state, action) => {
            state.combinedCredits = action.payload;
        }
    }
});

//SELECTORS
export const selectPersonDetails = state => state.person.personDetails;
export const selectPersonImages = state => state.person.personImages;
export const selectPersonTaggedImages = state => state.person.personTaggedImages;
export const selectCombinedCredits = state => state.person.combinedCredits;

//REDUCER
export default person.reducer;