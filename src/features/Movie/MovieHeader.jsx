import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetails, selectDetails } from './movieSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingList from '../../components/Loading/LoadingList';
import { getMovieHeaderStyles } from '../../styles/styles';
import { useTheme } from "@mui/material";
import Link from '@mui/material/Link';

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
    const headerStyles = getMovieHeaderStyles(theme);

    return (
        <Box sx={headerStyles.container}>
            {isLoading ? <LoadingList items={1} /> : (
                <>
                    <Box> 
                        <Link href={`/movie/${id}`}>
                            <img 
                                src={moviePosterUrl} 
                                alt={title} 
                                style={headerStyles.poster} 
                                />
                        
                        </Link>
                    </Box>

                    <Box sx={headerStyles.titleContainer}>
                        <Box sx={headerStyles.titleInnerContainer}>   
                            <Link href={`/movie/${id}`} sx={{textDecoration: "none"}}>
                                <Typography variant="h1" sx={headerStyles.title}>
                                    {title}
                                </Typography>    
                            </Link>
                            <Typography variant="caption" sx={headerStyles.date}>
                                ({date})
                            </Typography>    
                        </Box>
                    
                        <Link href={`/movie/${id}`} sx={headerStyles.button}>
                            <ArrowBackIcon />
                            <Typography variant="h3" sx={headerStyles.buttonText}>Back to main</Typography>
                        </Link>
                    </Box>
                </>
            )}
        </Box>
    )
};

export default MovieHeader

