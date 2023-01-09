import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../Movies/moviesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';

 const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchInput === '') return;
        dispatch(searchMovies({title: searchInput, page}))
    }, [dispatch, page, searchInput])

    const handlePageReset = (input) => {
        setSearchInput(input);
        setPage(1);
    }



    const handleSearch = (event) => {
        event.preventDefault();
        if (searchInput) {
          navigate(`/search?query=${searchInput}`);
        }
      };

    return (
        <main>
           <SearchBar 
                onSubmit={handleSearch}
                setSearchInput={handlePageReset}
            /> 
        </main>
    )
}

export default Home