import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendations, selectRecommendations } from './movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

const Recommendations = ({movieId}) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movieRecommendations = useSelector(selectRecommendations);
    const recommendationsResults = movieRecommendations.results;
    console.log(recommendationsResults)

    useEffect(() => {
        dispatch(getRecommendations({movieId, page}))
    }, [dispatch, movieId, page])

    return (
        <>
            <Typography variant="h4">Recommendations</Typography>
                <Grid container spacing={1} wrap="nowrap" direction="row" sx={{flexDirection: "row", overflowX: "scroll", overflowY: "hidden"}}>
                    {recommendationsResults.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </Grid>
        </>
    )
}

export default Recommendations