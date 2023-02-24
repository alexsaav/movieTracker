import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { selectSearchMovies, searchMovies } from './moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import { scrollTopWin } from '../util/helperFunctions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from '../MovieCard/MovieCardStyle1';
import { Box } from '@mui/system';
import PaginationComponent from '../../components/Pagination/Pagination';
import Typography from '@mui/material/Typography';
import MovieSearchResultCard from '../MovieCard/MovieSearchResultCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';



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
        <Container sx={{ padding: "30px 40px" }}>
            <Typography variant='h4'>Movies</Typography>
            <SearchBar searchText={searchText} setSearchText={handlePageReset}/>

            <Container sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", my: "20px"}}>
                {movieResult.map((movie) => (
                    <MovieSearchResultCard movie={movie} key={movie.id} onClick={scrollTopWin()}></MovieSearchResultCard>
                ))}   
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


/*  <MovieCard movie={movie} key={movie.id} /> */