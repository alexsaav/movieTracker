import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularMovies, selectPopularMovies } from "../moviesSlice"
import CardStyleOne from "../../Cards/CardStyleOne";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import LoadingItem from "../LoadingItem";
import { topMediaContainersStyles } from "../../styles/styles";

const TopPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(selectPopularMovies);
    const popularMoviesResults = popularMovies.results;
    const isLoading = popularMovies.isLoading;

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [dispatch])

    return (
        <Box component="section" sx={topMediaContainersStyles.sectionStyle}>
            <Typography variant="h2" sx={topMediaContainersStyles.sectionTitle}>Popular Movies</Typography>

            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingItem />}
                {popularMoviesResults.map(movie => {
                    return <CardStyleOne 
                                movie={movie} 
                                key={movie.id}
                            />
                })}
            </Box>
        </Box>
    )
}

export default TopPopularMovies