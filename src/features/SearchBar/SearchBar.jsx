import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { searchMoviesAsync } from '../Movies/moviesSlice';


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(searchMoviesAsync(searchInput))
    }, [dispatch, searchInput])

    const searchMovies = (searchValue) => {
        setSearchInput(searchValue)
        
    }

    return (
        <>
            <div className="card text-white bg-secondary my-5 py-4 ">
                <div className="card-body">
                    <input 
                        className='search-input'
                        placeholder='Search'
                        type="search" 
                        value={searchInput}
                        onChange={(e) => searchMovies(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar