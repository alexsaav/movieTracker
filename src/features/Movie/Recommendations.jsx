import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendations, selectRecommendations } from './movieSlice';
import { scrollTopWin } from '../util/helperFunctions';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Card } from '@mui/material';
import {CardMedia} from '@mui/material';
import { Link } from 'react-router-dom';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


const Recommendations = ({movieId}) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movieRecommendations = useSelector(selectRecommendations);
    const recommendationsResults = movieRecommendations.results;

    useEffect(() => {
        dispatch(getRecommendations({movieId, page}))
    }, [dispatch, movieId, page])
    
    return (
        <section style={{padding: "30px 0"}}>
            <Typography variant="h5">Recommendations</Typography>
            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                    }}
            >
                {recommendationsResults.map((movie) => {
                    const { backdrop_path, title, release_date, vote_average, id } = movie;

                    let image;
                    if (backdrop_path) {
                        const posterUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
                        image = <CardMedia 
                                    component="img"
                                    image={posterUrl}
                                    alt={title}
                                />
                    } else {
                        image = <Box sx={{textAlign: "center", pt: "30px"}}> 
                                    <ImageNotSupportedIcon color="disabled" sx={{ fontSize: 60, textAlign: "center" }}/>
                                </Box>
                    }

                    return (
                        <Box sx={{p: "0 5px"}}>
                            <Link to={`/movie/${id}`} onClick={scrollTopWin}>
                                <Card sx={{width: 260, minHeight: 146, maxHeight: 146, borderRadius: 3, position: "relative", background: "#EAEBEB"}}>
                                    {image}
                                    <Box sx={{
                                        padding: "0 7px", 
                                        background: 'rgba(0, 0, 0, 0.5)',
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
                        </Box>
                    )
                })}
            </Box>
        </section>
    )
}

export default Recommendations