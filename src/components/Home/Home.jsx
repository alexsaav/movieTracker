import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMulti } from '../SearchBar/searchSlice';
import HomeBanner from '../HomeBanner/HomeBanner';
import TrendingMovies from '../../features/Movies/Trending/TrendingMovies';
import TopUpcomingMovies from '../../features/Movies/Upcoming/TopUpcomingMovies';
import TopMoviesInTheatres from '../../features/Movies/InTheatres/TopMoviesInTheatres';
import { Box, Toolbar } from '@mui/material';


 const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMulti({name: searchText, page}))
    }, [dispatch, page, searchText])

    const handlePageReset = (input) => {
        setSearchText(input);
        setPage(1);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchText) navigate(`/search?query=${searchText}`);
    };

    return (
        <Box component='main'>
            <HomeBanner onSubmit={handleSearch} setSearchText={handlePageReset}/> 
            <Toolbar />
            <TrendingMovies />
            <Toolbar />
            <TopUpcomingMovies />
            <Toolbar />
            <TopMoviesInTheatres />   
        </Box>
    )
}

export default Home