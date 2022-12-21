import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { getMovieCreditsAsync, selectMovieCredits } from "./movieCreditsSlice"
import Toolbar from '@mui/material/Toolbar';
import Cast from "../Cast/Cast";
import Crew from "../Crew/Crew";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";


const MovieCredits = ({ topCast, moviePosterUrl, title }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieCredits = useSelector(selectMovieCredits);
    let movieCast = movieCredits.cast;
    const movieCrew = movieCredits.crew;    

    useEffect(() => {
        dispatch(getMovieCreditsAsync({id}));
    }, [dispatch, id]);
    
    return (
        <>
            <Box>
                <Toolbar sx={{backgroundColor: "black", height: '150px', width: '100%'}}>
                        <Card sx={{height: '100%'}}>
                            <Link to={`/movie/${id}`}>
                                    <CardMedia 
                                        component="img"
                                        image={moviePosterUrl}
                                        alt={title}
                                        primary={title}
                                    /> 
                            </Link>
                        </Card>
                        <Typography sx={{color: 'white'}}> <Link to={`/movie/${id}`}> {title}</Link></Typography>
                </Toolbar>   
            </Box>
            <Toolbar />
            <Container sx={{display: 'flex'}}>
                <Cast movieCast={movieCast} />
                <Toolbar />
                <Crew movieCrew={movieCrew} />
            </Container>
        </>
    )
}

export default MovieCredits
