import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTrendingMovies, selectTrendingMovies } from "../moviesSlice"
import CardStyle1 from "../../Cards/CardStyle1";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LoadingItem from "../../../components/Loading/LoadingCardItem";
import { topMediaContainersStyles } from "../../styles/styles";

const TrendingMovies = () => {
    const dispatch = useDispatch();
    const trendingMovies = useSelector(selectTrendingMovies);
    const trendingMoviesResult = trendingMovies.results;
    const isLoading = trendingMovies.isLoading;

    useEffect(() => {
        dispatch(getTrendingMovies())
    }, [dispatch])

    return (
        <Box component='section' sx={topMediaContainersStyles.wrapper}>
            <Typography variant="h2" sx={topMediaContainersStyles.title}>Trending Movies</Typography>

            <Box sx={topMediaContainersStyles.innerContainer}
            >
                {isLoading && <LoadingItem items={10} />}
                {trendingMoviesResult.map(movie => {
                    return <CardStyle1 movie={movie} key={movie.id} isLoading={trendingMovies.isLoading}/>
                })}
            </Box>
        </Box>
    )
}

export default TrendingMovies