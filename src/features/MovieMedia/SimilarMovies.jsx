import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSimilarMovies, selectSimilarMovies } from "../Movie/movieSlice"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SimilarMovies = ({movieId}) => {
    const dispatch = useDispatch();
    const similarMovies = useSelector(selectSimilarMovies);
    console.log(similarMovies)

    useEffect(() => {
        dispatch(getSimilarMovies({movieId}))
    }, [dispatch, movieId])

    return (
        <div>Similar Movies</div>
    )
}

export default SimilarMovies