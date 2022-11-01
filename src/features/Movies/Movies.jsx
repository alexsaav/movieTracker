import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { selectSearchMovies } from './moviesSlice';
import "./movies.css"
import SearchBar from '../SearchBar/SearchBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCard';

const Movies = () => {
    const moviesResult = useSelector(selectSearchMovies)
    const movieResultList = moviesResult.movies.results;

    return (
        <Container>
            <h1>Movies</h1>
            <SearchBar />


            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4} columns={{ xs: 10, sm: 12, md: 10 }}>
                    {movieResultList.map((movie) => (

                        <MovieCard movie={movie} />
                    ))}
                </Grid>
            </Container>
        </Container>
    )
}

export default Movies
