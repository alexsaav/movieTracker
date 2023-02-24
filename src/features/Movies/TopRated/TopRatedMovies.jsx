import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTopRatedMovies, selectTopRatedMovies } from "../moviesSlice"
import MovieCardList from "../MovieCardList"
import PaginationComponent from "../../../components/Pagination/Pagination"

const TopRatedMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(selectTopRatedMovies);
    const topRatedMoviesResults = topRatedMovies.results;
    const pages = 200;

    console.log(topRatedMovies)

    useEffect(() => {
        dispatch(getTopRatedMovies(page))
    }, [dispatch, page])

    return (
        <>
            <MovieCardList movieList={topRatedMoviesResults} title="Top Rated Movies" />
            <PaginationComponent 
                totalPages={pages} 
                setPage={setPage} 
                page={page} 
            />
        </>
    )
}

export default TopRatedMovies