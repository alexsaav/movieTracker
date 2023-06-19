import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


const overviewTextStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

 const SearchResultCard = ({ information }) => {
    const navigate = useNavigate();
    const { 
        id, 
        title, 
        overview, 
        poster_path, 
        backdrop_path, 
        vote_average, 
        release_date, 
        media_type,
        name,
        known_for_department,
        profile_path,
        known_for
    
    } = information;


    let date = release_date ? release_date : null
    let formattedDate = format(new Date(date), 'PPP');

    const knownForList = known_for?.map(work => work.title);
    const knowForWork = knownForList?.map((work) => <span key={work}>{work}</span>)

    let image;
    if (poster_path || backdrop_path || profile_path) {
        const moviePosterUrl = `https://image.tmdb.org/t/p/original${poster_path ?? backdrop_path ?? profile_path}`;
        image = <CardMedia
                    component="img"
                    image={moviePosterUrl}
                    alt={title}
                    sx={{height: "150px"}}
                /> 
    } else {
        image = <Box sx={{textAlign: "center", pt: "35px"}}>
                    <ImageNotSupportedIcon color="disabled" sx={{ fontSize: 60}}/>
                </Box> 
    }

    const onClick = () => {
        if (media_type === 'tv') navigate(`/page-not-found`)
        media_type === 'person' ? navigate(`/person/${id}/${name}`) : navigate(`/movie/${id}`)
    };
                        
    return (
        <Card 
            sx={{ display: "flex", mt: "10px", width: "100%", height: "150px"}} 
            onClick={onClick}
        >
            <CardActionArea sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <CardContent 
                    sx={{ 
                        minWidth: "94px", 
                        width: "94px", 
                        height: "100%",  
                        p: 0, 
                        borderRight: "1px solid #EAEBEB", 
                        background: "#EAEBEB"
                    }}
                >
                    { image }
                </CardContent>

                <CardContent sx={{ display: "flex", flexDirection: "column",  p: "10px 15px", width: "950px"}}>
                    <Box>
                        <Typography variant="h2" sx={{fontSize: "1rem", fontWeight: "bold"}} onClick={onClick}>{title ?? name}</Typography>
                        <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
                        {media_type === ('movie' || 'tv') && <Typography variant="body2" color="text.secondary">{media_type}</Typography>}
                        {known_for_department && <Typography>{known_for_department}</Typography>}
                        {known_for && knowForWork}
                    </Box>
                    <Box sx={{mt: "10px" }}>
                        <Typography variant="body2" color="text.secondary" sx={overviewTextStyle} >{overview}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SearchResultCard;