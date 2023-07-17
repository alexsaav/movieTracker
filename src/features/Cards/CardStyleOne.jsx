import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Box, Card, CardContent, CardActionArea, Typography, Avatar } from '@mui/material';
import CardImage from "./CardImage";
import { cardStyleOne } from "./cardStyles";

//Movie Card with score

const CardStyleOne = ({movie}) => {
    const navigate = useNavigate();
    const { id, title, poster_path, backdrop_path, vote_average, release_date, first_air_date } = movie;
    //const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
    //const backdroprUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const averageVotes = vote_average.toFixed(1);
    let formattedDate = format(new Date(release_date ?? first_air_date), 'PP');
    
    return (
        <Box key={id}>
            <Card sx={cardStyleOne.card}>
                <CardActionArea>
                    <CardImage  
                        poster={poster_path} 
                        backdrop={backdrop_path} 
                        title={title} 
                        classes={cardStyleOne.cardMedia}
                        classesNotFound={cardStyleOne.notFound}
                        onClick={() => navigate(`/movie/${id}`)}
                    />

                    <CardContent sx={cardStyleOne.cardContent}>
                        <Avatar sx={cardStyleOne.avatar}>
                            <Typography sx={cardStyleOne.votes}>{averageVotes}</Typography>
                        </Avatar>
                        <Typography 
                            variant="h2" 
                            display="block" 
                            component="div"
                            onClick={() => navigate(`/movie/${id}`)}
                            gutterBottom
                            sx={cardStyleOne.title}
                        >
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formattedDate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

export default CardStyleOne;
