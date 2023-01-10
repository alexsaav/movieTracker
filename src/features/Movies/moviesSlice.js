import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = "https://api.themoviedb.org/3";



// SEARCH MOVIES
export const searchMovies = createAsyncThunk(
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
);

//GET LATEST MOVIE
export const getLatestMovies = createAsyncThunk(
    "movies/getLastestMovies",

    async() => {
        const latestMoviesEndpoint = "/movie/latest";

        const urlToFetch = new URL(`${tmdbBaseUrl}${latestMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const latestMovies = await response.json();
            latestMovies.results.sort((a, b) => {
                const aDate = a.release_date ?? a.first_air_date;
                const bDate = b.release_date ?? b.first_air_date;
                if (!aDate) return 1;
                if (!bDate) return -1
               
                var dateA = new Date(aDate);
                var dateB = new Date(bDate);
                return dateB - dateA;  
            })
            return latestMovies;
        }

    }
);

//GET POPULAR MOVIE
export const getPopularMovies = createAsyncThunk(
    "movies/getPopularMovies",

    async(page = 1) => {
        const popularMoviesEndpoint = "/movie/popular";

        const urlToFetch = new URL(`${tmdbBaseUrl}${popularMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const popularMovies = await response.json();
            popularMovies.results.sort((a, b) => {
                const aDate = a.release_date ?? a.first_air_date;
                const bDate = b.release_date ?? b.first_air_date;
                if (!aDate) return 1;
                if (!bDate) return -1
               
                var dateA = new Date(aDate);
                var dateB = new Date(bDate);
                return dateB - dateA;  
            })
            return popularMovies;
        }

    }
);

//GET TOP RATED MOVIES
export const getTopRatedMovies = createAsyncThunk(
    "movies/getTopRatedMovies",

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

//GET UPCOMING MOVIES
export const getUpcomingMovies = createAsyncThunk(
    "movies/getUpcomingMovies",

    async(page = 1) => {
        const upcomingMoviesEndpoint = "/movie/upcoming";

        const urlToFetch = new URL(`${tmdbBaseUrl}${upcomingMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const upcomingMovies = await response.json();

            upcomingMovies.results.sort((a, b) => {
                const aDate = a.release_date ?? a.first_air_date;
                const bDate = b.release_date ?? b.first_air_date;
                if (!aDate) return 1;
                if (!bDate) return -1
               
                var dateA = new Date(aDate);
                var dateB = new Date(bDate);
                return dateB - dateA;  
            })

            return upcomingMovies;
        }

    }
);

//GET NOW PLAYING MOVIES
export const getMoviesInTheatres = createAsyncThunk(
    "movies/getMoviesInTheatres",

    async(page = 1) => {
        const moviesInTheatresEndpoint = "/movie/now_playing";

        const urlToFetch = new URL(`${tmdbBaseUrl}${moviesInTheatresEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const moviesInTheatres = await response.json();

            moviesInTheatres.results.sort((a, b) => {
                const aDate = a.release_date ?? a.first_air_date;
                const bDate = b.release_date ?? b.first_air_date;
                if (!aDate) return 1;
                if (!bDate) return -1
               
                var dateA = new Date(aDate);
                var dateB = new Date(bDate);
                return dateB - dateA;  
            })

            return moviesInTheatres;
        }

    }
);

//GET RELEASE DATES 
//GET RECOMMENDATIONS
//Get Changes
//Get Release Dates
//Get Trending /trending/{media_type}/{time_window}



// SLICE
export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            page: 1,
            results: [],
            total_pages: 0
        },
        popularMovies: {
            page: 1,
            results: []
        },
        topRatedMovies: {
            page: 1,
            results: []
        },
        upcomingMovies: {
            page: 1,
            results: []
        },
        moviesInTheatres: {
            page: 1,
            results: []
        }
    },
    extraReducers: {
        [searchMovies.fulfilled]: (state, action) => {
            state.movies = action.payload;
        },
        [getPopularMovies.fulfilled]: (state, action) => {
            state.popularMovies = action.payload;
        },
        [getTopRatedMovies.fulfilled]: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        [getUpcomingMovies.fulfilled]: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        [getMoviesInTheatres.fulfilled]: (state, action) => {
            state.moviesInTheatres = action.payload;
        }
    }
});

//SELECTORS
export const selectSearchMovies = state => state.movies.movies;
//export const selectLatestMovies = state => state.movies.latestMovies;
export const selectPopularMovies = state => state.movies.popularMovies;
export const selectTopRatedMovies = state => state.movies.topRatedMovies;
export const selectUpcomingMovies = state => state.movies.upcomingMovies;
export const selectMoviesInTheatres = state => state.movies.moviesInTheatres;

//REDUCER
export default moviesSlice.reducer;