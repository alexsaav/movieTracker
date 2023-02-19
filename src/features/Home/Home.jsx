import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../Movies/moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import UpcomingMovies from '../Movies/Upcoming/UpcomingMovies';
import { Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MoviesInTheatres from '../Movies/InTheatre/MoviesInTheatres';
import TrendingMovies from '../Movies/Trending/TrendingMovies';


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
        <Container>
            <SearchBar onSubmit={handleSearch} setSearchText={handlePageReset}/> 
            <Toolbar />
            <TrendingMovies />
            <Toolbar />
            {/* <TopPopularMovies />
            <Toolbar /> */}
            {/* <TopRatedMovies />
            <Toolbar /> */}
            <UpcomingMovies />
            <Toolbar />
            <MoviesInTheatres />   
        </Container>
    )
}

export default Home