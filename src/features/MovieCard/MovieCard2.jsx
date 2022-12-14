import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { CardMedia, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';

const MovieCard2 = ({movie}) => {
    const navigate = useNavigate();
    const { id, title, original_title, poster_path, backdrop_path, vote_average, release_date } = movie;
    const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
    //const posterUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const date = new Date(release_date);
                        let formattedDate = new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                                }).format(date);

    return (
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
    );
};

export default MovieCard2;
