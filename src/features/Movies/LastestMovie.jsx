import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getLatestMovies, selectLatestMovies } from "./moviesSlice"
import { Container, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"


const LastestMovies = () => {
    const dispatch = useDispatch();
    const latestMovies = useSelector(selectLatestMovies);

    useEffect(() => {
        dispatch(getLatestMovies())
    }, [dispatch])

    return (
        <Container>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Latest Movies</Typography>
            <Grid container wrap="nowrap">
                {}
            </Grid>
        </Container>
    )
}

export default LastestMovies