import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from 'react-router-dom';
import { getMovieCreditsAsync, selectMovieCredits } from '../movieCreditsSlice';
import { scrollTopWin } from '../../../util/helperFunctions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import ViewMore from '../../../components/Button/ViewMore';
import LoadingCardItem from '../../../components/Loading/LoadingCardItem';
import { topMediaContainersStyles } from '../../../styles/styles';

const TopCast = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movieCredits = useSelector(selectMovieCredits);
    let movieCast = movieCredits.cast;
    movieCast = movieCast.slice(0, 9)
    let isLoading = movieCredits.isLoading;

    useEffect(() => {
        dispatch(getMovieCreditsAsync(id));
    }, [dispatch, id]);

    return (
        <Box component="section" sx={topMediaContainersStyles.sectionStyle}>
            <Typography variant='h5' sx={topMediaContainersStyles.sectionTitle}>Top Cast</Typography>
            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingCardItem items={6} /> }
                {movieCast.map(cast => {
                    const { name, character, id, profile_path } = cast;
                    let image;
                    if (profile_path) {
                        const photorUrl = `https://image.tmdb.org/t/p/original/${profile_path}`;
                        image = <CardMedia
                                    component="img"
                                    height="140"
                                    image={photorUrl}
                                    alt={name}
                                /> 
                    } else {
                        image = <Box sx={{textAlign: "center"}}>
                                    <PersonIcon color="disabled" sx={{fontSize: 60, height:"140px"}}/>
                                </Box> 
                    }
                
                    return (
                        <Card 
                            sx={{ 
                                maxWidth: 130, 
                                minWidth: 130, 
                                paddingBottom: '3px', 
                                margin: '5px' 
                            }} 
                            key={id} 
                            onClick={scrollTopWin}
                        >        
                            <CardActionArea onClick={() => navigate(`/person/${id}/${name}`)}>
                                {image}
                                <CardContent sx={{padding: '5px 16px', bottom: 0}}>
                                    <Typography 
                                        noWrap 
                                        variant="h6" 
                                        component="div" 
                                        sx={{fontSize: "0.8rem"}} 
                                        onClick={() => navigate(`person/${id}-${name}`)}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {character}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </Box>
            <ViewMore route={`/movie/${id}/cast`} title={"Full Cast and Crew"} />
        </Box>
    )
}

export default TopCast
