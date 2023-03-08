import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularMovies, selectPopularMovies } from "../moviesSlice"
import MovieCard2 from "../../MovieCard/MovieCardStyle2";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import LoadingItem from "../LoadingItem";

const TopPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(selectPopularMovies);
    const popularMoviesResults = popularMovies.results;
    const isLoading = popularMovies.isLoading;

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [dispatch])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Popular Movies</Typography>

            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                }}
            >
                {isLoading && <LoadingItem />}
                {popularMoviesResults.map(movie => {
                    return <MovieCard2 movie={movie} key={movie.id}/>
                })}
            </Box>
        </section>
    )
}

export default TopPopularMovies