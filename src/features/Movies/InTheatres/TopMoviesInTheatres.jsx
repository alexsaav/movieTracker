import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesInTheatres, selectMoviesInTheatres } from "../moviesSlice"
import MovieCardStyle2 from "../../MovieCard/MovieCardStyle2"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import LoadingItem from "../../../components/Loading/LoadingCardItem"

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
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>In Theatres</Typography>

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
                {moviesInTheatresResults.map(movie => {
                    return <MovieCardStyle2 movie={movie} key={movie.id} isLoading={moviesInTheatres.isLoading}/>
                })}
            </Box>
        </section>
    )
}

export default TopMoviesInTheatres