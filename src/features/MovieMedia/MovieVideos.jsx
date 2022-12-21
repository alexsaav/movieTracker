import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, movie, selectVideos } from "../Movie/movieSlice"
import { Box } from "@mui/system"
import { List, ListItem, Typography } from "@mui/material"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';


const MovieVideos = ({movieId}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    const videos = movieVideos.results;
    console.log(videos)

    useEffect(() => {
        dispatch(getMovieVideos({movieId}))
    }, [dispatch, movieId])

    //const movieVideoUrl = `https://www.themoviedb.org/video/play?key=xRqAmYpV_Ts`;

    return (
        <Box>
            <Typography variant="h4">Videos</Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around", alignContent: "space-around"}}> 
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
                                src={movieVideoUrl}
                                alt={name}
                                site={site}
                            />
                        </Card>
                    );
                })}
            </Box>
        </Box>
    )
}

export default MovieVideos