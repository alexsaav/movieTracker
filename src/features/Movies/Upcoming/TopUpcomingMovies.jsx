import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUpcomingMovies, selectUpcomingMovies } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const TopUpcomingMovies = () => {
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

            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                }}
            >
                {upcomingMoviesResults.map(movie => {
                    return <MovieCard2 movie={movie} key={movie.id}/>
                })}
            </Box>
        </section>
    )
}

export default TopUpcomingMovies