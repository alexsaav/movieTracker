import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesInTheatres, selectMoviesInTheatres } from "../moviesSlice"
import CardStyleOne from "../../Cards/CardStyleOne"
import { 
    Box, 
    Typography 
} from "@mui/material"
import LoadingItem from "../../../components/Loading/LoadingCardItem"
import { topMediaContainersStyles } from "../../../styles/styles"

const TopMoviesInTheatres = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const moviesInTheatres = useSelector(selectMoviesInTheatres);
    const moviesInTheatresResults = moviesInTheatres.results;
    const isLoading = moviesInTheatres.isLoading;
    
    useEffect(() => {
        dispatch(getMoviesInTheatres(page))
    }, [dispatch, page])

    return (
        <Box component="section" sx={topMediaContainersStyles.wrapper}>
            <Typography variant="h2" sx={topMediaContainersStyles.title}>In Theatres</Typography>

            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingItem items={8} />}
                {moviesInTheatresResults.map(movie => {
                    return <CardStyleOne 
                                movie={movie} 
                                key={movie.id} 
                                isLoading={moviesInTheatres.isLoading}
                            />
                })}
            </Box>
        </Box>
    )
}

export default TopMoviesInTheatres