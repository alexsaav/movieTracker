import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from 'react-router-dom';
import { getMovieCreditsAsync, selectMovieCredits } from '../movieCreditsSlice';
import { scrollTopWin } from '../../util/helperFunctions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import Skeleton from '@mui/material/Skeleton';

let loadingItem = Array(6).fill(
    <Box>
        <Skeleton animation="wave" variant="rectangular" width={130} height={140} sx={{mr: 1, borderRadius: 2}} />
        <Box>
            <Skeleton animation="wave" height={15} width="90%" />
            <Skeleton animation="wave" height={15} width="90%" />
        </Box>
    </Box>
    );

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
        <section style={{padding: "30px 0"}}>
            <Typography variant='h5' sx={{fontWeight: 'bold'}}>Top Cast</Typography>
            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                }}
            >
                {isLoading && loadingItem}
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
            <Box sx={{mt: 4, mb: 4}}>
                <Link to={`/movie/${id}/cast`} style={{textDecoration: 'none', color: '#1D1F20'}} onClick={scrollTopWin}>
                    <Typography variant="button">Full Cast and Crew</Typography>
                </Link>
            </Box>
        </section>
    )
}

export default TopCast
