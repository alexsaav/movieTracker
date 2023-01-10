import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getTopRatedMovies, selectTopRatedMovies } from "./moviesSlice"
import { scrollTopWin } from '../util/helperFunctions';
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import { CardMedia, Typography } from "@mui/material"
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';


const TopRatedMovies = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const topRatedMovies = useSelector(selectTopRatedMovies);
    const topRatedMoviesResults = topRatedMovies.results;
    console.log(topRatedMoviesResults)

    useEffect(() => {
        dispatch(getTopRatedMovies(page))
    }, [dispatch, page])

    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Top Rated Movies</Typography>

            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={20} columns={6}>
                    {topRatedMoviesResults.map(movie => {
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
                                                <Avatar sx={{ background: 'rgba(0, 0, 0, 0.5)', position: "absolute", top: "5px", left: "10px" }}>
                                                    <Typography sx={{fontWeight: "bold"}}>{vote_average}</Typography>
                                                </Avatar>
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

export default TopRatedMovies