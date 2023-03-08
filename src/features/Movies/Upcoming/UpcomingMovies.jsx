import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUpcomingMovies, selectUpcomingMovies } from "../moviesSlice"
import MovieCardList from "../MovieCardList"
import PaginationComponent from "../../../components/Pagination/Pagination"

const UpcomingMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(selectUpcomingMovies);
    const upcomingMoviesResults = upcomingMovies.results;
    const pages = upcomingMovies.total_pages;

    useEffect(() => {
        dispatch(getUpcomingMovies(page))
    }, [dispatch, page])

    return (
        <>
            <MovieCardList movieList={upcomingMoviesResults} title="Upcoming Movies" isLoading={upcomingMovies.isLoading} />
            <PaginationComponent 
                totalPages={pages} 
                setPage={setPage} 
                page={page} 
            />
        </>
    )
}

export default UpcomingMovies