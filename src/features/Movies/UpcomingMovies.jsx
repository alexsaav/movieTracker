import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUpcomingMovies, selectUpcomingMovies } from "./moviesSlice"
import MovieCard2 from "../MovieCard/MovieCard2"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const UpcomingMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(selectUpcomingMovies);
    const upcomingMoviesResults = upcomingMovies.results;

    useEffect(() => {
        dispatch(getUpcomingMovies(page))
    }, [dispatch, page])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Upcoming Movies</Typography>

            <Box sx={{ marginTop: "30px", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {upcomingMoviesResults.map(movie => {
                        return <MovieCard2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default UpcomingMovies