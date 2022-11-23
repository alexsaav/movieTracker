import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { getMovieCreditsAsync, selectMovieCredits } from "./movieCreditsSlice"
import Toolbar from '@mui/material/Toolbar';
import Cast from "../Cast/Cast";
import Crew from "../Crew/Crew";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';


const MovieCredits = ({ topCast }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieCredits = useSelector(selectMovieCredits);
    let movieCast = movieCredits.cast;
    const movieCrew = movieCredits.crew;
    

    useEffect(() => {
        dispatch(getMovieCreditsAsync({id}));
    }, [dispatch, id]);


    
    return (
        <Container sx={{display: 'flex'}}>
            <Cast movieCast={movieCast} topCast={topCast}/>
            <Toolbar />
            {!topCast && <Crew movieCrew={movieCrew} />}
        </Container>
    )
}

export default MovieCredits