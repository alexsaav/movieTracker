import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails, selectDetails } from './movieSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingList from '../../components/Loading/LoadingList';
import { getMovieHeaderStyles } from '../styles/styles';
import { useTheme } from 'styled-components';

const MovieHeader = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectDetails);

    const { 
        title, 
        poster_path, 
        release_date, 
        isLoading
    } = movieDetailsResult;

    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const date = release_date.slice(0,4);

    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])
    

    const theme = useTheme();
    const styles = getMovieHeaderStyles(theme);

    return (
        <Box sx={styles.container}>
            {isLoading ? <LoadingList items={1} /> : (
                <>
                    <Box> 
                        <Link to={`/movie/${id}`}>
                            <img 
                                src={moviePosterUrl} 
                                alt={title} 
                                style={styles.poster} 
                                />
                        
                        </Link>
                    </Box>

                    <Box sx={styles.titleContainer}>
                        <Box sx={styles.titleInnerContainer}>   
                            <Link to={`/movie/${id}`} style={{textDecoration: "none"}}>
                                <Typography variant="h1" sx={styles.title}>
                                    {title}
                                </Typography>    
                            </Link>
                            <Typography variant="caption" sx={styles.date}>
                                ({date})
                            </Typography>    
                        </Box>
                    
                        <Link to={`/movie/${id}`} style={styles.button}>
                            <ArrowBackIcon />
                            <Typography variant="h3" sx={styles.buttonText}>Back to main</Typography>
                        </Link>
                    </Box>
                </>
            )}
        </Box>
    )
};

export default MovieHeader

