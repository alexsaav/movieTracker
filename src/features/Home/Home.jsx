import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../Movies/moviesSlice';
import TopUpcomingMovies from '../Movies/Upcoming/TopUpcomingMovies';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import TopMoviesInTheatres from '../Movies/InTheatres/TopMoviesInTheatres';
import TrendingMovies from '../Movies/Trending/TrendingMovies';
import HomeBanner from '../../components/HomeBanner/HomeBanner';


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