import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails, selectDetails } from './movieSlice';
import TopCast from '../Cast/TopCast';
import TopImages from '../MovieMedia/TopImages';
import TopVideos from '../MovieMedia/TopVideos';
import Recommendations from './Recommendations';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Typography from '@mui/material/Typography';


const Movie = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectDetails);

    const { 
        title, 
        genres, 
        original_language, 
        overview, 
        poster_path, 
        release_date, 
        runtime, 
        tagline,
        vote_average } = movieDetailsResult;

    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const averageVotes = vote_average.toFixed(1);
    
    
    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes}m`;
    }

    return (
        <>
            <Grid container rowSpacing={2} sx={{flexWrap: "nowrap", background: 'rgba(0, 0, 0, 0.8)', padding: '0' }} >
                <Box sx={{margin: "30px 60px", display: "flex"}}>
                    <Box sx={{
                            height: 500,
                            display: 'flex',
                            borderRadius: '15px',
                        }}>
                            <img src={moviePosterUrl} alt={title} style={{borderRadius: '15px'}} />
                    </Box>
                    <Grid sx={{display: 'flex', flexDirection: 'column', marginLeft: '50px', marginTop: "100px", color: '#F7F7F8'}}>
                        <Box>
                            <Typography variant='h4' sx={{fontWeight: 'bold'}}>{title}</Typography>
                            <Box sx={{paddingBottom: '5px'}}>{release_date} | {genres.map(genre => <span> {genre.name} </span>)} | {toHoursAndMinutes(runtime)}</Box>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
                            <Box sx={{ marginRight: '25px'}}>{averageVotes}</Box>
                            <Stack direction="row" spacing={1} >
                                <IconButton aria-label="list" sx={{color: '#F7F7F8'}}> 
                                    <FormatListBulletedIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <IconButton aria-label="favourite" sx={{color: '#F7F7F8'}}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <IconButton aria-label="watchList" sx={{color: '#F7F7F8'}}>
                                    <BookmarkBorderIcon />
                                </IconButton>
                            </Stack>
                        </Box>

                        <Box sx={{paddingBottom: '5px', margin: '20px 0', color: '#B7BBBD'}}>{tagline}</Box>
                        <Box sx={{paddingBottom: '5px'}}>
                            <Typography sx={{marginBottom: '10px', fontWeight: 'bold'}}>Overview</Typography> 
                            <Box>{overview}</Box>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
            
            <Box sx={{margin: '50px 50px'}}>
                <TopCast id={id} />
                <Divider />
                <TopImages title={title} movieId={id} />
                <Divider />
                <TopVideos title={title} movieId={id} />
                <Divider />
                <Recommendations movieId={id} />
            </Box>
        </>
    )
}

export default Movie
