import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMovieDetailsAsync, selectMovieDetails } from './movieDetailsSlice'
import './movieDetails.css'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const MovieDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectMovieDetails);
    console.log(movieDetailsResult)
    const movieDetail = movieDetailsResult.movieDetails;
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`;
    
    useEffect(() => {
        dispatch(getMovieDetailsAsync({id}))
    }, [dispatch, id])

    if(!movieDetail) return;


    return (
        <Container>
            <h1>{movieDetail.title}</h1>
            <Box sx={{
                width: 500,
                height: 500,
            }} >
                <img src={moviePosterUrl} alt={movieDetail.title} />

            </Box>
        </Container>
    )
}

export default MovieDetails