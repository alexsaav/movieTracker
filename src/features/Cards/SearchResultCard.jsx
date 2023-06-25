import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { Box, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { searchResultCard } from './cardStyles';
import CardImage from './CardImage';


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
    const knowForWork = knownForList?.map(
        (work) => <Typography variant='caption' key={work} sx={searchResultCard.knownFor}>{work} |</Typography>);

    const onClick = () => {
        if (media_type === 'tv') navigate(`/page-not-found`)
        media_type === 'person' ? navigate(`/person/${id}/${name}`) : navigate(`/movie/${id}`)
    };
                        
    return (
        <Card sx={searchResultCard.card} onClick={onClick}>
            <CardActionArea sx={searchResultCard.cardActionArea}>
                <CardContent sx={searchResultCard.cardContentImage} >

                    <CardImage 
                        poster={poster_path}
                        backdrop={backdrop_path}
                        profilePicture={profile_path}
                        onClick={onClick}
                        classes={searchResultCard.cardMedia}
                        classesNotFound={searchResultCard.notFound}
                        title={title}
                    />
                </CardContent>

                <CardContent sx={searchResultCard.cardContentInfo}>
                    <Box>
                        <Typography variant="h2" sx={searchResultCard.title} onClick={onClick}>{title ?? name}</Typography>
                        <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
                        {media_type === ('movie' || 'tv') && 
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={searchResultCard.mediaType}
                            >
                                {media_type}
                            </Typography>
                        }
                        {known_for_department && <Typography>{known_for_department}</Typography>}
                        {known_for && knowForWork}
                    </Box>
                    <Box sx={searchResultCard.overview}>
                        <Typography variant="body2" color="text.secondary" sx={overviewTextStyle} >{overview}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SearchResultCard;