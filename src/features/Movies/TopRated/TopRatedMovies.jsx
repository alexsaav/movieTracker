import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTopRatedMovies, selectTopRatedMovies } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"



const TopRatedMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(selectTopRatedMovies);
    const topRatedMoviesResults = topRatedMovies.results;

    useEffect(() => {
        dispatch(getTopRatedMovies(page))
    }, [dispatch, page])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Top Rated Movies</Typography>

            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {topRatedMoviesResults.map(movie => {
                        return <MovieCard2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default TopRatedMovies