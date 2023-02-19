import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { selectSearchMovies, searchMovies } from './moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCardStyle1';
import PaginationComponent from '../../components/Pagination/Pagination';
import Typography from '@mui/material/Typography';



const Movies = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("query"));
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movies = useSelector(selectSearchMovies);
    const movieResult = movies.results;
    const totalPages = movies.total_pages-1;


    useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMovies({title: searchText, page}))
    }, [dispatch, page, searchText])

    const handlePageReset = (input) => {
        setSearchText(input);
        setPage(1);
    }

    return (
        <Container>
            <Typography variant='h4'>Movies</Typography>
            <SearchBar searchText={searchText} setSearchText={handlePageReset}/>

            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4} columns={{ xs: 10, sm: 12, md: 10 }}>
                    {movieResult.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </Grid>
            </Container>

            <PaginationComponent 
                totalPages={totalPages} 
                setPage={setPage} 
                page={page} 
            />
        </Container>
    )
}

export default Movies
