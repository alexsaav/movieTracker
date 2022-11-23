import React from 'react'
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; 
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const MovieCard = ({ movie }) => {
    const { id, title, poster_path } = movie;
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;

    return (
        <Grid item key={movie.id} xs={8} sm={4} md={2}>
            <Link to={`/movie/${id}`}>
                <Card sx={{height: '100%'}}>
                    <CardMedia 
                        component="img"
                        image={moviePosterUrl}
                        alt={title}
                    /> 
                </Card>
            </Link>
        </Grid>
    )
}

export default MovieCard