import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../Movies/moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Box, Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import PopularMovies from '../Movies/PopularMovies';
import TopRatedMovies from '../Movies/TopRatedMovies';


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
            <PopularMovies />
            <Toolbar />
            <TopRatedMovies />
        </Box>
    )
}

export default Home