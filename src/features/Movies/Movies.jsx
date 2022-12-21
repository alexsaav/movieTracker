import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchMovies, searchMovies } from './moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCard';
import PaginationComponent from '../../components/Pagination/Pagination';
import Typography from '@mui/material/Typography';



const Movies = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const moviesResult = useSelector(selectSearchMovies);
    const movieResultList = moviesResult.movies.results;
    const totalPages = moviesResult.movies.total_pages-1;

    useEffect(() => {
        if(searchInput === '') return;
        dispatch(searchMovies({title: searchInput, page}))
    }, [dispatch, page, searchInput])

    const handlePageReset = (input) => {
        setSearchInput(input);
        setPage(1);
    }

    return (
        <Container>
            <Typography variant='h4'>Movies</Typography>
            <SearchBar setSearchInput={handlePageReset} />

            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4} columns={{ xs: 10, sm: 12, md: 10 }}>
                    {movieResultList.map((movie) => (
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
