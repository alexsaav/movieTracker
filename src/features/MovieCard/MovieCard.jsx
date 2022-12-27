import React from 'react'
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const MovieCard = ({ movie }) => {
    const { id, title, poster_path, backdrop_path } = movie;
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path ?? backdrop_path}`;

    return (
        <Grid item key={movie.id} xs={8} sm={4} md={2}>
            <Link to={`/movie/${id}`}>
                <ImageListItem key={id}>
                    <img
                        src={moviePosterUrl}
                        srcSet={`${moviePosterUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={title}
                        loading="lazy"
                        style={{borderRadius: '15px', height: "300px"}}
                    />
                    <ImageListItemBar
                        title={title}
                        sx={{borderBottomLeftRadius : "15px", borderBottomRightRadius: "15px"}}
                    />
                </ImageListItem>
            </Link>
        </Grid>
    )
}

export default MovieCard
