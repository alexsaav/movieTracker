import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const MovieVideos = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    const videos = movieVideos.results;
    console.log(videos)

    useEffect(() => {
        dispatch(getMovieVideos({movieId}))
    }, [dispatch, movieId])


    return (
        <Box sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h5">Videos</Typography>
                <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                    <Grid container wrap="nowrap" spacing={33} sx={{ overflowX: 'auto'}} columns={6} >
                        {videos.map((video) => {
                            const { id, key, name, site } = video;
                            const videoUrl = `https://www.themoviedb.org/video/play?key=${key}`;

                            return (
                                <Grid item xs={4} key={id}>
                                    <Link to={`/video/${id}`}>
                                        <Card 
                                            sx={{width: 250, height: '100%'}}
                                        >
                                            <CardMedia 
                                                component="video"
                                                image={videoUrl}
                                                alt={name}
                                            />
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box sx={{mt: 4, mb: 4}}>
                        <Link to={`/movie/${title}-${movieId}/video`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                            <Typography variant="button">View More</Typography>
                        </Link>
                    </Box>
                </Box>
        </Box> 
    )
}

export default MovieVideos


/* 
 <Box>
            <Typography variant="h4">Videos</Typography>
            <Box 
                sx={{display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "5px", overflowX: "scroll", overflowY: "hidden", height: "300px"}}> 
                {videos.map(video => {
                    const { id, key, name, site } = video;
                    const movieVideoUrl = `https://www.themoviedb.org/video/play?key=${key}`;

                    return (
                        <Card key={id} sx={{mb: 5}}>
                            <CardContent>
                                <Typography>{name}</Typography>
                            </CardContent>

                            <IconButton aria-label="play/pause">
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                            
                            <CardMedia
                                component="video"
                                image={movieVideoUrl}
                                alt={name}
                                site={site}
                            />
                        </Card>
                    );
                })}
            </Box>
        </Box>

*/