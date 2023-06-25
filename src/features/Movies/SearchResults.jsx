import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { searchMulti, selectMovies, selectPeople, selectSearchResults } from '../../components/SearchBar/searchSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import PaginationComponent from '../../components/Pagination/Pagination';
import { Container, Box, Typography, Skeleton } from '@mui/material';
import { scrollTopWin } from '../util/helperFunctions';
import SearchResultCard from '../Cards/SearchResultCard';

const loadingItem = Array(20).fill((
    <Box sx={{mb: 2, display: "flex" }}>
        <Skeleton animation="wave" variant="rectangular" width={94} height={150} sx={{borderRadius: 2}} />
        <Box sx={{display: "flex", flexDirection: "column", width:"100%", ml: 1}}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height="100%"  sx={{borderRadius: 2}} />
        </Box>
    </Box>
));

const SearchResults = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("query"));
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchText === '') return;
        dispatch(searchMulti({name: searchText, page}))
    }, [dispatch, page, searchText])

    const handlePageReset = (input) => {
        setSearchText(input);
        setPage(1);
    }

    const results = useSelector(selectSearchResults);
    const isLoading = results.isLoading;
    const totalPages = results.total_pages;
    const people = useSelector(selectPeople);
    const movies = useSelector(selectMovies);

    return (
        <Container sx={{ padding: "30px 40px" }}>
            <Typography variant='h4'>Search '{searchText}'</Typography>
            <SearchBar searchText={searchText} setSearchText={handlePageReset}/>

                {people && 
                    <Container sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", my: "20px"}}>
                        {/* {isLoading && loadingItem} */}
                        <Typography variant='h4'>People</Typography>
                        {people.map((person) => (
                            <SearchResultCard information={person} key={person.id} onClick={scrollTopWin()} />
                        ))}   
                    </Container>
                }

                {movies && 
                    <Container sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", my: "20px"}}>
                        {/* {isLoading && loadingItem} */}
                        <Typography variant='h4'>Titles</Typography>
                        {movies.map((result) => (
                            <SearchResultCard information={result} key={result.id} onClick={scrollTopWin()} />
                        ))}   
                    </Container>
                }

            <PaginationComponent 
                totalPages={totalPages} 
                setPage={setPage} 
                page={page} 
            />
        </Container>
    )
}

export default SearchResults
