import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMovieDetailsAsync, selectMovieDetails } from './movieDetailsSlice'
import { selectMovieCredits } from '../MovieCredits/movieCreditsSlice'
import MovieCredits from '../MovieCredits/MovieCredits'
import './movieDetails.css'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';

import Icon from '@mui/material/Icon';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import CollectionsIcon from '@mui/icons-material/Collections';

import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import PersonIcon from '@mui/icons-material/Person';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';



const MovieDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectMovieDetails);
    const movieDetail = movieDetailsResult.movieDetails;
    /* const movieCredits = useSelector(selectMovieCredits);
    const movieCast = movieCredits.cast; */

    const { 
        title, 
        genres, 
        original_language, 
        overview, 
        poster_path, 
        release_date, 
        runtime, 
        tagline,
        vote_average } = movieDetail;

    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const averageVotes = vote_average.toFixed(1);
    
    
    useEffect(() => {
        dispatch(getMovieDetailsAsync({id}))
    }, [dispatch, id])

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes}m`;
    }



    //if(movieDetail === '') return <div>Loading</div>

    return (
        <Container>
             <Grid container rowSpacing={2} >
                    <Grid sx={{
                        height: 500,
                        width: '100%',
                        display: 'flex'
                    }}>
                        <img src={moviePosterUrl} alt={title} />
                    </Grid>
                    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                        <h1>{title}</h1>
                        <div sx={{paddingBottom: '5px'}}>{release_date} | {genres.map(genre => <span> {genre.name} </span>)} | {toHoursAndMinutes(runtime)}</div>
                        <div>{averageVotes}</div>
                        <Stack direction="row" spacing={1} >
                            <IconButton aria-label="list"> 
                                <FormatListBulletedIcon />
                            </IconButton>
                            <IconButton aria-label="favourite">
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton aria-label="watchList">
                                <BookmarkBorderIcon />
                            </IconButton>
                        </Stack>
                        <div sx={{paddingBottom: '5px'}}>{tagline}</div>
                        <div sx={{paddingBottom: '5px'}}>Overview 
                            <div>{overview}</div>
                        </div>
                    </Grid>
                    </Grid>
            
            <Container>
                <h1>Top Cast</h1>
                {
                    () => {

                    }
                }
                <MovieCredits topCast={true} />
                <Link to={`/movie/${id}/cast`} >Full Cast and Crew</Link>
            </Container>
        </Container>
    )
}

export default MovieDetails

{/* <Container sx={{ 
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    }} maxWidth="lg"
>
</Container> */}