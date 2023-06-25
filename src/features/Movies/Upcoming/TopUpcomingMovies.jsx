import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUpcomingMovies, selectUpcomingMovies } from "../moviesSlice"
import CardStyle1 from "../../Cards/CardStyle1"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LoadingItem from "../../../components/Loading/LoadingCardItem"
import { topMediaContainersStyles } from "../../styles/styles"

const TopUpcomingMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(selectUpcomingMovies);
    const upcomingMoviesResults = upcomingMovies.results;
    const isLoading = upcomingMovies.isLoading;

    useEffect(() => {
        dispatch(getUpcomingMovies(page))
    }, [dispatch, page])

    return (
        <Box component="section" sx={topMediaContainersStyles.wrapper}>
            <Typography variant="h2" sx={topMediaContainersStyles.title}>Upcoming Movies</Typography>

            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingItem items={8} />}
                {upcomingMoviesResults.map(movie => {
                    return <CardStyle1 movie={movie} key={movie.id}/>
                })}
            </Box>
        </Box>
    )
}

export default TopUpcomingMovies