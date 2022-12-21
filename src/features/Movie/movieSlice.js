import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';


// GET MOVIE DETAILS
export const getMovieDetails = createAsyncThunk(
    "movie/getMovieDetails",

    async({id}) => {
        //Get Movie Details Endpoint
        const movieDetailsEndpoint = `/movie/${id}`;
        
        const urlToFetch = new URL(`${tmdbBaseUrl}${movieDetailsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const details = await response.json();
            return { details };
        }
    }
);

// GET IMAGES
export const getMovieImages = createAsyncThunk(
    "movieMedia/getMovieImages",

    async({movieId}) => {
        //Get Movie Images Endpoint
        const movieImagesEndpoint = `/movie/${movieId}/images`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${movieImagesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        //urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const images = await response.json();
            console.log(images)
            return { images };
        }
    }
);

// GET VIDEOS
export const getMovieVideos = createAsyncThunk(
    "movie/getMovieVideos",

    async ({movieId}) => {
        //Get Movie Videos Endpoint
        const movieVideosEndpoint = `/movie/${movieId}/videos`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${movieVideosEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        //urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const videos = await response.json();
            console.log(videos)
            return { videos };
        }

    }
);

// GET REVIEWS

// GET SIMILAR MOVIES


// SLICE details, images, videos
export const movie = createSlice({
    name: "movie",
    initialState: {
        details: {
            genres: [],
            vote_average: 0
        },
        images: {
            id: 0,
            backdrops: [],
            logos: [],
            posters: []
        },
        videos: {
            results: []
        }
    },
    extraReducers: {
        [getMovieDetails.fulfilled]: (state, action) => {
            state.details = action.payload.details;
        },
        [getMovieImages.fulfilled]: (state, action) => {
            state.images = action.payload.images;
        },
        [getMovieVideos.fulfilled]: (state, action) => {
            state.videos = action.payload.videos;
        }
    }
});

export const selectDetails = state => state.movie.details;
export const selectImages = state => state.movie.images;
export const selectVideos = state => state.movie.videos;

export default movie.reducer;