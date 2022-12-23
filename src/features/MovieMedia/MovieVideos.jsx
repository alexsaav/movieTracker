import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../Movie/movieSlice"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const MovieVideos = ({movieId}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    const videos = movieVideos.results;

    useEffect(() => {
        dispatch(getMovieVideos({movieId}))
    }, [dispatch, movieId])


    return (
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
    )
}

export default MovieVideos