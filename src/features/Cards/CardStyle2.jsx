import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Card, CardContent, CardActionArea, Typography, Avatar } from '@mui/material';
import { cardStyle2 } from "./cardStyles";
import CardImage from "./CardImage";

//Movie Card with score

const CardStyle2 = ({movie}) => {
    const navigate = useNavigate();
    const { id, title, original_title, poster_path, backdrop_path, vote_average, release_date } = movie;
    //const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
    //const posterUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const averageVotes = vote_average.toFixed(1);
    let formattedDate = format(new Date(release_date), 'PP');

    return (
        <Grid item xs={1} key={id} sx={{display: 'flex', justifyContent: 'center'}}>
            <Card sx={cardStyle2.card}>
                <CardActionArea onClick={() => navigate(`/movie/${id}`)}>

                    <CardImage 
                        poster={poster_path} 
                        backdrop={backdrop_path} 
                        title={title} 
                        onClick={() => navigate(`/movie/${id}`)} 
                        classes={cardStyle2.cardMedia}
                        classesNotFound={cardStyle2.notFound}
                    />
                    <CardContent sx={cardStyle2.cardContent}>
                        <Avatar sx={cardStyle2.avatar}>
                            <Typography sx={cardStyle2.votes}>{averageVotes}</Typography>
                        </Avatar>
                        <Typography 
                            variant="h2" 
                            display="block" 
                            component="div"
                            onClick={() => navigate(`/movie/${id}`)}
                            gutterBottom
                            sx={cardStyle2.title}
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
    );
};

export default CardStyle2;
