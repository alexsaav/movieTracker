import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { getMovieCreditsAsync, selectMovieCredits } from '../MovieCredits/movieCreditsSlice';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


const TopCast = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movieCredits = useSelector(selectMovieCredits);
    let movieCast = movieCredits.cast;
    movieCast = movieCast.slice(0, 9)

    useEffect(() => {
        dispatch(getMovieCreditsAsync(id));
    }, [dispatch, id]);


    return (
        <Box container='main'>
            <Typography variant='h5' sx={{fontWeight: 'bold'}}>Top Cast</Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
            sx={{overflowX: "scroll", overflowY: "hidden", margin: '20px 0px'}}
            >
                {movieCast.map(cast => {
                    const { name, character, id, profile_path } = cast;
                
                    return (
                        <Card 
                            sx={{ 
                                maxWidth: 140,  
                                paddingBottom: '3px', 
                                margin: '5px' 
                            }} 
                            key={id} 
                        >
                            <CardActionArea onClick={() => navigate(`person/${id}-${name}`)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://image.tmdb.org/t/p/original/${profile_path}`}
                                    alt={name}
                                />
                                <CardContent sx={{padding: '5px 16px'}}>
                                    <Typography 
                                        noWrap 
                                        variant="h6" 
                                        component="div" 
                                        sx={{fontSize: '1em'}} 
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
            </Grid>
        </Box>
    )
}

export default TopCast
