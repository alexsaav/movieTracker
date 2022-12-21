import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// GET PERSON DETAILS
export const getPersonDetailsAsync = createAsyncThunk(
    'person/getPersonDetailsAsync',

    async({id}) => {
        const personDetailsEndpoint = `/person/${id}`;
        
        const urlToFetch = new URL(`${tmdbBaseUrl}${personDetailsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const personDetails = await response.json();
            console.log(personDetails);
            return { personDetails };
            
        }
    }
);

// SLICE
export const person = createSlice({
    name: 'person',
    initialState: {
        personDetails: {
            name: ""
        }
    },
    extraReducers: {
        [getPersonDetailsAsync.pending]: (state, action) => {
            console.log('hello')
        },
        [getPersonDetailsAsync.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export const selectPersonDetails = state => state.personDetails;
export default person.reducer;