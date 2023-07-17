import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendations, selectRecommendations } from './movieSlice';
import { scrollTopWin } from '../../util/helperFunctions';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Card } from '@mui/material';
import {CardMedia} from '@mui/material';
import { Link } from 'react-router-dom';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { recommendationsStyles, topMediaContainersStyles } from '../../styles/styles';
import { LoadingRecommendationCard } from '../../components/Loading/LoadingRecommendationsCard';

const Recommendations = ({movieId}) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const movieRecommendations = useSelector(selectRecommendations);
    const recommendationsResults = movieRecommendations.results;
    const isLoading = movieRecommendations.isLoading;

    useEffect(() => {
        dispatch(getRecommendations({movieId, page}))
    }, [dispatch, movieId, page])
    
    return (
        <Box component="section" sx={topMediaContainersStyles.sectionStyle}>
            <Typography variant="h5" sx={topMediaContainersStyles.sectionTitle}>Recommendations</Typography>
            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingRecommendationCard />}
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
                        <Box sx={{p: "0 5px"}} key={id}>
                            <Link to={`/movie/${id}`} onClick={scrollTopWin}>
                                <Card sx={recommendationsStyles.card}>
                                    {image}
                                    <Box sx={recommendationsStyles.imageContainer}>
                                        <Typography 
                                            variant="subtitle1" 
                                            display="block" 
                                            gutterBottom
                                            sx={recommendationsStyles.title}
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
        </Box>
    )
}

export default Recommendations