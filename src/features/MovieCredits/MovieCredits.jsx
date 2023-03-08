import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getMovieCreditsAsync, selectMovieCredits } from "./movieCreditsSlice"
import MovieHeader from "../Movie/MovieHeader";
import Toolbar from '@mui/material/Toolbar';
import Crew from "./Crew/Crew";
import Cast from "./Cast/Cast";
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';

let loadingItem = Array(10).fill(
    (<Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
        <Skeleton animation="wave" variant="circular" width={56} height={56} />
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", ml: 1}}>
            <Skeleton animation="wave" variant="h1" height={15} width={200} sx={{ marginBottom: 1 }} />
            <Skeleton animation="wave" variant="h2" height={15} width={200} /> 
        </Box>
    </Box>
));

const MovieCredits = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movieCredits = useSelector(selectMovieCredits);
    const movieCast = movieCredits.cast;
    const movieCrew = movieCredits.crew;    
    let isLoading = movieCredits.isLoading;

    useEffect(() => {
        dispatch(getMovieCreditsAsync(id));
    }, [dispatch, id]);
    
    return (
        <>
            <MovieHeader />
            <Toolbar />
            <Container sx={{display: 'flex'}}>
                <Cast movieCast={movieCast} isLoading={isLoading} loadingItem={loadingItem} />
                <Toolbar />
                <Crew movieCrew={movieCrew} isLoading={isLoading} loadingItem={loadingItem} />
            </Container>
        </>
    )
}

export default MovieCredits
