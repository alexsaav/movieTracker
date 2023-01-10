import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getPopularMovies, selectPopularMovies } from "./moviesSlice"
import { scrollTopWin } from '../util/helperFunctions';
import { CardMedia, Container, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MovieCard from "../MovieCard/MovieCard"
import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import createTheme from "@mui/material";


import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';



const PopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(selectPopularMovies);
    const navigate = useNavigate();
    const popularMoviesResults = popularMovies.results;

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [dispatch])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Latest Movies</Typography>

            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {popularMoviesResults.map(movie => {
                        const { id, title, original_title, poster_path, backdrop_path, vote_average, release_date } = movie;
                        const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
                        const date = new Date(release_date);
                        let formattedDate = new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                                }).format(date);
                        
                        return(
                            <Grid item xs={1} key={id}>
                                    <Card 
                                        sx={{width: 150, minWidth: 150, borderRadius: 3, position: "relative", background: "transparent", boxShadow: "none"}}
                                    >
                                        <CardActionArea>
                                            <CardMedia 
                                                component="img"
                                                image={posterUrl}
                                                alt={title}
                                                sx={{height: "calc(150px * 1.5)", borderRadius: "10px", boxShadow: "0 2px 8px rgb(0 0 0 / 10%)"}}
                                                onClick={() => navigate(`/movie/${id}`)}
                                            />
                                            <CardContent sx={{display: "flex", flexDirection: "column", alignContent: "flex-start", flexWrap: "wrap"}}>
                                                <Typography 
                                                    variant="h2" 
                                                    display="block" 
                                                    component="div"
                                                    onClick={() => navigate(`/movie/${id}`)}
                                                    gutterBottom
                                                    sx={{mb: 0, textDecoration: "none", paddingBottom: 0, overflowX: 'auto', fontWeight: "bold", fontSize: "1rem"}}
                                                >
                                                    {title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formattedDate}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </section>
    )
}

export default PopularMovies