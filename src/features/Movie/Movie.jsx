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
import Skeleton from '@mui/material/Skeleton';
import ButtonsList from './ButtonsList';
import { Paper } from '@mui/material';


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


    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const averageVotes = vote_average.toFixed(1);
    let getDateYear = getYear(new Date(release_date));
    
    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes}m`;
    }

    const styles = {
        paperContainer: {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${backdrop_path}`})`,
        },
    };


    return (
        <>
            <Paper style={styles.paperContainer}>
                <Box container sx={{display: "flex", flexWrap: "nowrap", alignItems: "center", background: 'rgba(0, 0, 0, 0.8)', padding: '0', height: "600px" }} >
                {isLoading ? <LoadingBox /> : (
                    <Box sx={{p: "30px 40px", color: "#fff"}}>
                        <section style={{display: "flex", flexWrap: "noWrap"}}>
                            <Box sx={{
                                height: 450,
                                minWidth: 300,
                                display: 'flex',
                                borderRadius: '15px',
                                width: "35%",
                                overflow: "hidden"
                            }}>
                                <img src={moviePosterUrl} alt={title} style={{borderRadius: '15px'}} />
                            </Box>
                                        
                            <Box sx={{display: 'flex', color: '#F7F7F8'}}>
                                <section style={{display: 'flex', flexWrap: "wrap", alignContent: "center", paddingLeft: "40px"}}>
                                    <Box sx={{display: "flex", flexWrap: "wrap", width: "100%", mb: "24px"}}>
                                            <>
                                                <Typography variant='h1' sx={{fontSize: "2.2rem", fontWeight: 'bold',  width: "100%"}}>
                                                    {title}
                                                    <Typography variant='caption' sx={{fontSize: "2.2rem", opacity: 0.8, pl: 1}}>({getDateYear})</Typography>
                                                </Typography>
                                                
                                                <Box sx={{display: "flex", paddingBottom: '5px'}}>
                                                    <span>{release_date}</span>
                                                    <Divider orientation="vertical" sx={{borderColor: '#F7F7F8', padding: "0 2px"}}/> 
                                                    {genres.map(genre => <span style={{padding: "0 4px"}}>{genre.name}</span>)} 
                                                    <Divider orientation="vertical" sx={{borderColor: '#F7F7F8'}}/>  
                                                    <span style={{padding: "0 4px"}}>{toHoursAndMinutes(runtime)}</span>
                                                </Box>
                                            </>
                                        
                                    </Box>
                                    <ButtonsList averageVotes={averageVotes} />

                                    <Box sx={{width: "100%"}}>
                                    {isLoading ? (
                                        <Skeleton animation="wave" variant="h3" width={500} height={30} sx={{mb: "5px"}}/>
                                    ) : (
                                        <Typography variant="subtitle1" sx={{opacity: 0.7, color: '#B7BBBD'}}>
                                            {tagline}
                                        </Typography>
                                    )}
                                    <Typography variant='h3' sx={{m: '10px 0', fontSize: "1.3em", fontWeight: 600, overflow: "hidden" }}>Overview</Typography> 
                                    
                                    <Box sx={{paddingBottom: '5px'}}>
                                        {isLoading ? (
                                            <Skeleton animation="wave" variant="body1" height={100} width="100%" sx={{mb: "5px"}}/>
                                        ) : (
                                            <Typography variant='body1'>
                                                {overview}
                                            </Typography>
                                        )}
                                    </Box>
                                    </Box>
                                    
                                    
                                </section>
                            </Box>
                        </section>
                    </Box>
                    )}
                </Box>
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
