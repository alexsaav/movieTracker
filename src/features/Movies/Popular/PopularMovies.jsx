import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularMovies, selectPopularMovies } from "../moviesSlice"
import MovieCardList from "../MovieCardList";
import PaginationComponent from "../../../components/Pagination/Pagination";

const PopularMovies = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const popularMovies = useSelector(selectPopularMovies);
    const popularMoviesResults = popularMovies.results;
    const pages = 200;


    useEffect(() => {
        dispatch(getPopularMovies(page))
    }, [dispatch, page])

    return (
        <>
            <MovieCardList movieList={popularMoviesResults} title="Popular Movies" isLoading={popularMovies.isLoading}/>
            <PaginationComponent 
                totalPages={pages} 
                setPage={setPage} 
                page={page} 
            />
        </>
    )
}

export default PopularMovies