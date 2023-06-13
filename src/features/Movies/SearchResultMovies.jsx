import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { selectSearchMovies, searchMovies } from './moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieSearchResultCard from '../MovieCard/SearchResultMovieCard';
import { scrollTopWin } from '../util/helperFunctions';
import Container from '@mui/material/Container';
import PaginationComponent from '../../components/Pagination/Pagination';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const loadingItem = Array(20).fill((
    <Box sx={{mb: 2, display: "flex" }}>
        <Skeleton animation="wave" variant="rectangular" width={94} height={150} sx={{borderRadius: 2}} />
        <Box sx={{display: "flex", flexDirection: "column", width:"100%", ml: 1}}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height="100%"  sx={{borderRadius: 2}} />
        </Box>
    </Box>
));

const SearchResultMovies = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("query"));
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movies = useSelector(selectSearchMovies);
    const movieResult = movies.results;
    const totalPages = movies.total_pages-1;
    const isLoading = movies.isLoading;


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
            {isLoading && loadingItem}
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

export default SearchResultMovies