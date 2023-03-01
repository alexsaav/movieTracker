import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';


// GET MOVIE DETAILS
export const getMovieDetails = createAsyncThunk(
    "movie/getMovieDetails",

    async(id) => {
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

    async(idMovie) => {
        //Get Movie Images Endpoint
        const movieImagesEndpoint = `/movie/${idMovie}/images`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${movieImagesEndpoint}`);

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

        const urlToFetch = new URL(`${tmdbBaseUrl}${movieVideosEndpoint}`);

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

        const urlToFetch= new URL(`${tmdbBaseUrl}${recommendationsEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        urlToFetch.searchParams.append("language", "en-US");
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const recommendations = await response.json();
            console.log(recommendations)
            return { recommendations };
        }
    }
);


// GET SIMILAR MOVIES
export const getSimilarMovies = createAsyncThunk(
    "movie/getSimilarMovies",

    async({movieId, page = 1}) => {
        //Get Similar Movies Endpoint
        const similarMoviesEndpoint = `/movie/${movieId}/similar`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${similarMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);
        urlToFetch.searchParams.append("language", "en-US");
        urlToFetch.searchParams.append("page", page);


        const response = await fetch(urlToFetch);

        if(response.ok) {
            const similarMovies = await response.json();
            return { similarMovies };
        }
    }
);

//GET RELEASE DATES 
export const getMovieReleaseDates = createAsyncThunk(
    "movie/getMovieReleaseDates",

    async(movieId) => {
        //Get Similar Movies Endpoint
        const releaseDatesEndpoint = `/movie/${movieId}/release_dates`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${releaseDatesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const releaseDates = await response.json();
            return releaseDates;
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
        },
        similarMovies: {
            results: []
        },
        recommendations: {
            results: []
        },
        releaseDates: {

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
        },
        [getSimilarMovies.fulfilled]: (state, action) => {
            state.similarMovies = action.payload.similarMovies;
        }, 
        [getRecommendations.fulfilled]: (state, action) => {
            state.recommendations = action.payload.recommendations;
        },
        [getMovieReleaseDates.fulfilled]: (state, action) => {
            state.releaseDates = action.payload;
        },
    }
});


//SELECTORS
export const selectDetails = state => state.movie.details;
export const selectImages = state => state.movie.images;
export const selectVideos = state => state.movie.videos;
export const selectSimilarMovies = state => state.movie.similarMovies;
export const selectRecommendations = state => state.movie.recommendations;
export const selectReleaseDates = state => state.movie.releaseDates;

//REDUCER
export default movie.reducer;