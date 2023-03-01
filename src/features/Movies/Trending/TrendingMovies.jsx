import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTrendingMovies, selectTrendingMovies } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2";
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

            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                }}
            >
                {trendingMoviesResult.map(movie => {
                    return <MovieCard2 movie={movie} key={movie.id}/>
                })}
            </Box>
        </section>
    )
}

export default TrendingMovies