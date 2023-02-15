import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTrendingMovies, selectTrendingMovies } from "./moviesSlice"
import MovieCard2 from "../MovieCard/MovieCard2";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const TrendingMovies = () => {
    const dispatch = useDispatch();
    const trendingMovies = useSelector(selectTrendingMovies);
    const trendingMoviesResult = trendingMovies.results;

    useEffect(() => {
        dispatch(getTrendingMovies())
    }, [dispatch])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Trending Movies</Typography>

            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {trendingMoviesResult.map(movie => {
                        return <MovieCard2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default TrendingMovies