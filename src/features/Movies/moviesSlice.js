import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format, add } from "date-fns";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = "https://api.themoviedb.org/3";



// SEARCH MOVIES
/* export const searchMovies = createAsyncThunk(
    "movies/searchMovies",

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
); */

//GET POPULAR MOVIES
export const getPopularMovies = createAsyncThunk(
    "movies/getPopularMovies",

    async(page = 1) => {
        const popularMoviesEndpoint = "/discover/movie";

        const urlToFetch = new URL(`${tmdbBaseUrl}${popularMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en")
        urlToFetch.searchParams.append("region", "GB");
        urlToFetch.searchParams.append("sort_by", "popularity.desc");
        urlToFetch.searchParams.append("include_adult", "false");
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const popularMovies = await response.json();
            return popularMovies;
        }
    }
);

//GET TOP RATED MOVIES
export const getTopRatedMovies2 = createAsyncThunk(
    "movies/getTopRatedMovies2",

    async(page = 1) => {
        const topRatedMoviesEndpoint = "/movie/top_rated";

        const urlToFetch = new URL(`${tmdbBaseUrl}${topRatedMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const topRatedMovies = await response.json();
            return topRatedMovies;
        }

    }
);

export const getTopRatedMovies = createAsyncThunk(
    "movies/getTopRatedMovies",

    async(page = 1) => {
        const getTopRatedMoviesEndpoint = "/discover/movie";

        const urlToFetch = new URL(`${tmdbBaseUrl}${getTopRatedMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en")
        urlToFetch.searchParams.append("region", "GB");
        urlToFetch.searchParams.append("sort_by", "vote_count.desc");
        urlToFetch.searchParams.append("include_adult", "false");
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const getTopRatedMovies = await response.json();
            return getTopRatedMovies;
        }
    }
);

//GET UPCOMING MOVIES
export const getUpcomingMovies = createAsyncThunk(
    "movies/getUpcomingMovies",

    async(page = 1) => {
        const upcomingMoviesEndpoint = "/discover/movie";

        const urlToFetch = new URL(`${tmdbBaseUrl}${upcomingMoviesEndpoint}`);

        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const addDate = add(new Date(), {years: 1} ); 
        const nextDate = format(addDate,'yyyy-MM-dd'); 

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en")
        urlToFetch.searchParams.append("region", "GB");
        urlToFetch.searchParams.append("sort_by", "release_date.asc");
        urlToFetch.searchParams.append("include_adult", "false");
        urlToFetch.searchParams.append("page", page);
        urlToFetch.searchParams.append("release_date.gte", currentDate);
        urlToFetch.searchParams.append("release_date.lte", nextDate);
        urlToFetch.searchParams.append("with_release_type", "3");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const upcomingMovies = await response.json();
            return upcomingMovies;
        }
    }
);

//GET TRENDING MOVIES
export const getTrendingMovies = createAsyncThunk(
    "movies/getTrendingMovies",

    async () => {
        const trendingMoviesEndpoint = `/trending/movie/week`;

        const urlToFetch = new URL(`${tmdbBaseUrl}${trendingMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const trendingMovies = await response.json();
            return trendingMovies;
        }
    }
);


//GET MOVIES IN THEATRES
export const getMoviesInTheatres = createAsyncThunk(
    "movies/getMoviesInTheatres",

    async(page = 1) => {
        const moviesInTheatresEndpoint = "/discover/movie";

        const urlToFetch = new URL(`${tmdbBaseUrl}${moviesInTheatresEndpoint}`);

        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const addDate = add(new Date(), {days: 30} ); 
        const nextDate = format(addDate,'yyyy-MM-dd'); 

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en")
        urlToFetch.searchParams.append("region", "GB");
        urlToFetch.searchParams.append("sort_by", "popularity.desc");
        urlToFetch.searchParams.append("include_adult", "false");
        urlToFetch.searchParams.append("page", page);
        urlToFetch.searchParams.append("release_date.gte", currentDate);
        urlToFetch.searchParams.append("release_date.lte", nextDate);
        urlToFetch.searchParams.append("with_release_type", "3");

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const moviesInTheatres = await response.json();
            return moviesInTheatres;
        }
    }
);



// SLICE
export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            page: 1,
            results: [],
            total_pages: 0,
            isLoading: false
        },
        popularMovies: {
            page: 1,
            results: [],
            isLoading: false
        },
        topRatedMovies: {
            page: 1,
            results: [],
            isLoading: false
        },
        upcomingMovies: {
            page: 1,
            results: [],
            isLoading: false
        },
        moviesInTheatres: {
            page: 1,
            results: [],
            isLoading: false
        },
        trendingMovies: {
            page: 1,
            results: [],
            isLoading: false
        },
    },
    extraReducers: {
        /* [searchMovies.pending]: (state, action) => {
            state.movies.isLoading = true;
        },
        [searchMovies.fulfilled]: (state, action) => {
            state.movies = action.payload;
        }, */

        [getPopularMovies.pending]: (state, action) => {
            state.popularMovies.isLoading = true;
        },
        [getPopularMovies.fulfilled]: (state, action) => {
            state.popularMovies = action.payload;
        },

        [getTopRatedMovies.pending]: (state, action) => {
            state.topRatedMovies.isLoading = true;
        },
        [getTopRatedMovies.fulfilled]: (state, action) => {
            state.topRatedMovies = action.payload;
        },

        [getUpcomingMovies.pending]: (state, action) => {
            state.upcomingMovies.isLoading = true;
        },
        [getUpcomingMovies.fulfilled]: (state, action) => {
            state.upcomingMovies = action.payload;
        },

        [getMoviesInTheatres.pending]: (state, action) => {
            state.moviesInTheatres.isLoading = true;
        },
        [getMoviesInTheatres.fulfilled]: (state, action) => {
            state.moviesInTheatres = action.payload;
        },

        [getTrendingMovies.pending]: (state, action) => {
            state.trendingMovies.isLoading = true;
        },
        [getTrendingMovies.fulfilled]: (state, action) => {
            state.trendingMovies = action.payload;
        },
    }
});

//SELECTORS
export const selectSearchMovies = state => state.movies.movies;
export const selectPopularMovies = state => state.movies.popularMovies;
export const selectTopRatedMovies = state => state.movies.topRatedMovies;
export const selectUpcomingMovies = state => state.movies.upcomingMovies;
export const selectMoviesInTheatres = state => state.movies.moviesInTheatres;
export const selectTrendingMovies = state => state.movies.trendingMovies;

//REDUCER
export default moviesSlice.reducer;