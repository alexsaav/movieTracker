import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config.json'

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;


// GET MOVIE DETAILS
export const getMovieDetails = createAsyncThunk(
    "movie/getMovieDetails",

    async(id) => {
        //Get Movie Details Endpoint
        const movieDetailsEndpoint = `/movie/${id}`;
        
        const urlToFetch = new URL(`${config.tmdbBaseUrl}${movieDetailsEndpoint}`);

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

    async(idMovie) => {
        //Get Movie Images Endpoint
        const movieImagesEndpoint = `/movie/${idMovie}/images`;

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${movieImagesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        //urlToFetch.searchParams.append("language", "en-US");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const images = await response.json();
            return { images };
        }
    }
);

// GET VIDEOS
export const getMovieVideos = createAsyncThunk(
    "movie/getMovieVideos",

    async (movieId) => {
        //Get Movie Videos Endpoint
        const movieVideosEndpoint = `/movie/${movieId}/videos`;

        const urlToFetch = new URL(`${config.tmdbBaseUrl}${movieVideosEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        urlToFetch.searchParams.append("language", "en-US");
        urlToFetch.searchParams.append("include_image_language", "en,null")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const videos = await response.json();
            return { videos };
        }

    }
);

//GET RECOMMENDATIONS
export const getRecommendations = createAsyncThunk(
    "movie/getRecommendations",

    async({movieId, page = 1}) => {
        //Get Recommendations Endpoint
        const recommendationsEndpoint = `/movie/${movieId}/recommendations`;

        const urlToFetch= new URL(`${config.tmdbBaseUrl}${recommendationsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        urlToFetch.searchParams.append("language", "en-US");
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const recommendations = await response.json();
            return { recommendations };
        }
    }
);


// SLICE details, images, videos
export const movie = createSlice({
    name: "movie",
    initialState: {
        details: {
            poster_path: "",
            release_date: "",
            genres: [],
            vote_average: 0,
            isLoading: false
        },
        images: {
            id: 0,
            backdrops: [],
            logos: [],
            posters: [],
            isLoading: false
        },
        videos: {
            results: [],
            isLoading: false
        },
        recommendations: {
            results: [],
            isLoading: false
        },
    },
    extraReducers: {
        [getMovieDetails.pending]: (state, action) => {
            state.details.isLoading = true;
        },
        [getMovieDetails.fulfilled]: (state, action) => {
            state.details = action.payload.details;
        },

        [getMovieImages.pending]: (state, action) => {
            state.images.isLoading = true;
        },
        [getMovieImages.fulfilled]: (state, action) => {
            state.images = action.payload.images;
        },

        [getMovieVideos.pending]: (state, action) => {
            state.videos.isLoading = true;
        },
        [getMovieVideos.fulfilled]: (state, action) => {
            state.videos = action.payload.videos;
        },

        [getRecommendations.pending]: (state, action) => {
            state.recommendations.isLoading = true;
        },
        [getRecommendations.fulfilled]: (state, action) => {
            state.recommendations = action.payload.recommendations;
        },
    }
});


//SELECTORS
export const selectDetails = state => state.movie.details;
export const selectImages = state => state.movie.images;
export const selectVideos = state => state.movie.videos;
export const selectRecommendations = state => state.movie.recommendations;

//REDUCER
export default movie.reducer;