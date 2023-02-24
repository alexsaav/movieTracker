import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesInTheatres, selectMoviesInTheatres } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const TopMoviesInTheatres = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const moviesInTheatres = useSelector(selectMoviesInTheatres);
    const moviesInTheatresResults = moviesInTheatres.results;
    
    useEffect(() => {
        dispatch(getMoviesInTheatres(page))
    }, [dispatch, page])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>In Theatres</Typography>

            <Box sx={{ marginTop: "30px", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {moviesInTheatresResults.map(movie => {
                        return <MovieCard2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default TopMoviesInTheatres