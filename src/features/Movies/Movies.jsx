import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchMovies, searchMoviesAsync } from './moviesSlice';
import "./movies.css"
import SearchBar from '../SearchBar/SearchBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCard';
import PaginationComponent from '../Pagination/Pagination';

const Movies = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const moviesResult = useSelector(selectSearchMovies);
    
    const movieResultList = moviesResult.movies.results;
    const totalPages = moviesResult.movies.total_pages-1;

    useEffect(() => {
        dispatch(searchMoviesAsync({title: searchInput, page}))
    }, [dispatch, page, searchInput])


    return (
        <Container>
            <h1>Movies</h1>
            <SearchBar setSearchInput={setSearchInput} />

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
                currentPage={page} 
            />
        </Container>
    )
}

export default Movies
