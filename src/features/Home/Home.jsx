import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../Movies/moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import PopularMovies from '../Movies/PopularMovies';
import TopRatedMovies from '../Movies/TopRatedMovies';
import UpcomingMovies from '../Movies/UpcomingMovies';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MoviesInTheatres from '../Movies/MoviesInTheatres';
import TrendingMovies from '../Movies/TrendingMovies';


 const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMovies({title: searchText, page}))
    }, [dispatch, page, searchText])

    const handlePageReset = (input) => {
        setSearchText(input);
        setPage(1);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchText) navigate(`/search?query=${searchText}`);
      };

    return (
        <Box sx={{margin: '50px 50px'}}>
            <SearchBar onSubmit={handleSearch} setSearchText={handlePageReset}/> 
            <Toolbar />
            <TrendingMovies />
            <Toolbar />
            {/* <PopularMovies />
            <Toolbar /> */}
            {/* <TopRatedMovies />
            <Toolbar /> */}
            <UpcomingMovies />
            <Toolbar />
            <MoviesInTheatres />   
        </Box>
    )
}

export default Home