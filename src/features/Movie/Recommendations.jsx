import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendations, selectRecommendations } from './movieSlice';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Card } from '@mui/material';
import {CardMedia} from '@mui/material';
import { Link } from 'react-router-dom';

const Recommendations = ({movieId}) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movieRecommendations = useSelector(selectRecommendations);
    const recommendationsResults = movieRecommendations.results;

    useEffect(() => {
        dispatch(getRecommendations({movieId, page}))
    }, [dispatch, movieId, page])

    const scrollTopWin = () => {
        window.scrollTo(200, 0);
    }
    
    return (
        <Box sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h5">Recommendations</Typography>
                <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll", borderRadius: "10px"}}>
                    <Grid container wrap="nowrap" spacing={33} sx={{ overflowX: 'auto'}} columns={6} >
                        {recommendationsResults.map((movie) => {
                            const { backdrop_path, title, release_date, vote_average, id } = movie;
                            const posterUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

                            return (
                                <Grid item xs={4}>
                                    <Link to={`/movie/${id}`} onClick={scrollTopWin}>
                                        <Card 
                                                sx={{width: 260, borderRadius: 3, position: "relative"}}
                                            >
                                                <CardMedia 
                                                    component="img"
                                                    image={posterUrl}
                                                    alt={title}
                                                />
                                                <Box sx={{padding: "0 7px", background: 'rgba(0, 0, 0, 0.5)',
                                                    position: "absolute",
                                                    color: "#F7F7F8",
                                                    textDecoration: "none",
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    paddingBottom: 1
                                                }}>
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        display="block" 
                                                        gutterBottom
                                                        sx={{mb: 0, textDecoration: "none", paddingBottom: 0}}
                                                    >
                                                        {title}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                    </Link>
                                </Grid>
                            )
                            })}
                    </Grid>
                </Box>
        </Box>
    )
}

export default Recommendations