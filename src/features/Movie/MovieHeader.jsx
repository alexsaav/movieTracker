import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails, selectDetails } from './movieSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieHeader = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieDetailsResult = useSelector(selectDetails);

    const { 
        title, 
        poster_path, 
        release_date, 
    } = movieDetailsResult;

    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const date = release_date.slice(0,4);

    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])

    return (
        <Box sx={{background: 'rgba(0, 0, 0, 0.7)', padding: "15px 40px", display: "flex"}}>
            <Box> 
                <Link to={`/movie/${id}`}>
                    <img 
                        src={moviePosterUrl} 
                        alt={title} 
                        style={{
                            borderRadius: 10, 
                            height: 87, 
                            width: 58, 
                            minWidth: 58, 
                            padding: 6
                        }} 
                    />
                </Link>
            </Box>

            <Box 
                sx={{
                    color: "#F7F7F8", 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", 
                    alignContent: "center",
                    paddingLeft: "20px",
                }}
            >
                <Box 
                    sx={{
                        display: "flex", 
                        alignContent: "center", 
                        alignItems: "center", 
                        mb: 0
                    }}
                >
                    <Link to={`/movie/${id}`} style={{textDecoration: "none"}}>
                        <Typography 
                            variant="h2" 
                            sx={{
                                color: "#F7F7F8", 
                                fontSize: "2.2rem", 
                                fontWeight: 600
                            }}
                        >
                            {title}
                        </Typography>
                    </Link>
                    <Typography 
                        variant="caption" 
                        sx={{fontSize: "1.1em", 
                            fontWeight: 400, 
                            margin: "0 10px", 
                            opacity: 0.6}}
                    >
                        ({date})
                    </Typography>
                </Box>
                <Link 
                    to={`/movie/${id}`} 
                    style={{textDecoration: "none", 
                            color: "#F7F7F8", 
                            opacity: 0.6, 
                            fontSize: "1.1em", 
                            display: "flex", 
                            margin: 0}}
                >
                    <ArrowBackIcon />
                    <Typography variant="h3" sx={{fontSize: "1.1em", fontWeight: 600,}}>Back to main</Typography>
                </Link>
            </Box>
        </Box>
    )
}

export default MovieHeader

