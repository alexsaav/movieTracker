import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { searchMovies } from '../../features/Movies/moviesSlice';
import { searchMulti } from '../../components/SearchBar/searchSlice'
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {

            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchAppBar = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

/*     useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMovies({title: searchText, page}))
    }, [dispatch, page, searchText]) */

    useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMulti({name: searchText, page}))
    }, [dispatch, page, searchText])

    const search = (searchValue) => {
        handlePageReset(searchValue)
    }

    const handlePageReset = (input) => {
        setSearchText(input);
        setPage(1);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchText) navigate(`/search?query=${searchText}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }} component="form" onSubmit={handleSearch}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    defaultValue={searchText}
                    onChange={(e) => {search(e.target.value)}}
                />
            </Search>
        </Box>
    );
};

export default SearchAppBar;