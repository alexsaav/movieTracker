import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularMovies, selectPopularMovies } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const TopPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(selectPopularMovies);
    const popularMoviesResults = popularMovies.results;

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [dispatch])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Popular Movies</Typography>

            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {popularMoviesResults.map(movie => {
                        return <MovieCard2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default TopPopularMovies