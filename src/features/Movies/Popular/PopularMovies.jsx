import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularMovies, selectPopularMovies } from "../moviesSlice"
import MovieCard3 from "../../MovieCard/MovieCardStyle3";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import PaginationComponent from "../../../components/Pagination/Pagination";


const PopularMovies = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const popularMovies = useSelector(selectPopularMovies);
    const popularMoviesResults = popularMovies.results;
    console.log(popularMovies)
    const pages = 200;


    useEffect(() => {
        dispatch(getPopularMovies(page))
    }, [dispatch, page])

    return (
        <Container sx={{padding: "30px 40px", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold", mb: "20px"}}>Popular Movies</Typography>

            <section sx={{ py: 5, width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Grid container spacing={{ xs: 4, s: 2, md: 3 }} columns={{ xs: 3, sm: 4, md: 6 }} sx={{ flexWrap: "wrap"}}>
                    {popularMoviesResults.map(movie => {
                        return <MovieCard3 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </section>

            <PaginationComponent 
                totalPages={pages} 
                setPage={setPage} 
                page={page} 
            />
        </Container>
    )
}

export default PopularMovies