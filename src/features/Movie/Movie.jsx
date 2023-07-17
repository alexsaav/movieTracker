import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetails, selectDetails } from './movieSlice';
import { getYear } from 'date-fns';
import LoadingBox from '../../components/Loading/LoadingBox';
import TopCast from '../MovieCredits/Cast/TopCast';
import TopImages from './MovieMedia/TopImages';
import TopVideos from './MovieMedia/TopVideos';
import Recommendations from './Recommendations';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ButtonsList from './ButtonsList';
import { Paper } from '@mui/material';
import { getMovieComponentStyles, detailsComponentStyles } from '../../styles/styles';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';


const Movie = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectDetails);

    const { 
        title, 
        genres, 
        overview, 
        poster_path,
        backdrop_path, 
        release_date, 
        runtime, 
        tagline,
        vote_average,
        isLoading
    } = movieDetailsResult;

    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])

    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const averageVotes = vote_average.toFixed(1);
    let getDateYear = getYear(new Date(release_date));
    
    const paperContainer = {
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        background: 'rgba(0, 0, 0, 0.8)',
        backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${backdrop_path}`})`,
    }
    
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes}m`;
    }

    const theme = useTheme();
    const styles = getMovieComponentStyles(theme);

    return (
        <>
            <Paper sx={paperContainer}>
                {isLoading ? <LoadingBox items={3} /> : (
                <Box container='true' sx={styles.container}>
                    <Box sx={detailsComponentStyles.imageContainer}>
                        <img src={moviePosterUrl} alt={title} style={detailsComponentStyles.borderRadius} />
                    </Box>            
                            
                    <Box sx={detailsComponentStyles.infoContainer}>            
                        <Box sx={detailsComponentStyles.header}>
                            <Box sx={{width: "100%"}}>
                                <Typography variant='h1' sx={detailsComponentStyles.title}>
                                    {title}
                                    <Typography variant='caption' sx={styles.releaseDate}>       
                                        ({getDateYear})
                                    </Typography>
                                </Typography>
                            </Box> 

                            <Box sx={styles.factsContainer}>
                                <span>{release_date}</span>
                                <Divider orientation="vertical" sx={styles.divider}/> 
                                {genres.map(genre => <span style={{padding: "0 4px"}} key={genre.name}>{genre.name}</span>)} 
                                <Divider orientation="vertical" sx={styles.divider}/>  
                                <span style={styles.runtime}>{toHoursAndMinutes(runtime)}</span>
                            </Box>
                        </Box>

                        {/* <ButtonsList averageVotes={averageVotes} /> */}

                        <Box sx={styles.headerInfo}>
                            <Typography variant="subtitle1" sx={styles.tagline}>
                                {tagline}
                            </Typography>
                            
                            <Typography variant='h3' sx={styles.overviewTitle}>
                                Overview
                            </Typography> 
                                    
                            <Box sx={styles.overviewText}>
                                <Typography variant='body1'>
                                    {overview}
                                </Typography>
                            </Box>
                        </Box>    
                    </Box>
                </Box>
                )}
            </Paper>
            
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
