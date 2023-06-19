import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { CardMedia, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';

//Movie Card with score

const MovieCardStyle3 = ({movie}) => {
    const navigate = useNavigate();
    const { id, title, original_title, poster_path, backdrop_path, vote_average, release_date } = movie;
    const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
    //const posterUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const averageVotes = vote_average.toFixed(1);
    let formattedDate = format(new Date(release_date), 'PP');

    return (
        <Grid item xs={1} key={id} sx={{display: 'flex', justifyContent: 'center'}}>
            <Card 
                sx={{
                    width: 160, 
                    height: "100%", 
                    borderRadius: 2, 
                    position: "relative", 
                    display: "flex", 
                    flexWrap: "wrap", 
                    alignContent: "flex-start", 
                    overflow: "hidden" 
                }}
            >
                <CardActionArea onClick={() => navigate(`/movie/${id}`)}>
                    <CardMedia 
                        component="img"
                        image={posterUrl}
                        alt={title}
                        sx={{height: 225, overflow: "hidden"}}
                        onClick={() => navigate(`/movie/${id}`)}
                    />
                    <CardContent sx={{display: "flex", flexDirection: "column", alignContent: "flex-start", flexWrap: "wrap"}}>
                        <Avatar sx={{ background: 'rgba(0, 0, 0, 0.5)', position: "absolute", top: "5px", left: "10px" }}>
                            <Typography sx={{fontWeight: "bold"}}>{averageVotes}</Typography>
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
    );
};

export default MovieCardStyle3;
