import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getMovieCreditsAsync, selectMovieCredits } from "./movieCreditsSlice"
import MovieHeader from "../Movie/MovieHeader";
import Toolbar from '@mui/material/Toolbar';
import Cast from "../Cast/Cast";
import Crew from "../Crew/Crew";
import Container from '@mui/material/Container';


const MovieCredits = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieCredits = useSelector(selectMovieCredits);
    const movieCast = movieCredits.cast;
    const movieCrew = movieCredits.crew;    

    console.log(movieCast)
    console.log(movieCrew)

    useEffect(() => {
        dispatch(getMovieCreditsAsync(id));
    }, [dispatch, id]);
    
    return (
        <>
            <MovieHeader />
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
