import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Card, CardMedia, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TopVideos = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    let videos = movieVideos.results;
    videos = videos.slice(0, 9);

    useEffect(() => {
        dispatch(getMovieVideos(movieId))
    }, [dispatch, movieId])

    const scrollTopWin = () => {
        window.scrollTo(200, 0);
    }

    return (
        <Box sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h5">Videos</Typography>
                <Box sx={{margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                    <Grid container wrap="nowrap" spacing={46} sx={{ overflowX: 'auto'}} columns={6} >
                        {videos.map((video) => {
                            const { id, key, name, site } = video;
                            //const videoUrl = `https://www.youtube.com/embed/${key}`;
                            const videoImgUrl = `https://img.youtube.com/vi/${key}/sddefault.jpg`

                            return (
                                <Grid item xs={4} key={key}>
                                    <Link to={`/movie/${title}/${movieId}/videos`} onClick={scrollTopWin} style={{textDecoration: 'none', color: '#1D1F20'}}>
                                        <Card sx={{minWidth: "360px", position: "relative" }}> 
                                            <CardMedia
                                                component="img"
                                                image={videoImgUrl}
                                            />
                                           
                                                    <Box aria-label="play/pause"
                                                    sx={{padding: "0 7px", background: 'rgba(0, 0, 0, 0.5)',
                                                    position: "absolute",
                                                    color: "primary",
                                                    textDecoration: "none",
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    paddingBottom: 1
                                                }}
                                                    >
                                                        <PlayArrowIcon sx={{ height: 38, width: 38, color: "#F7F7F8" }} />
                                                    </Box>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
                <Box sx={{mt: 4}}>
                    <Link to={`/movie/${title}/${movieId}/videos`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                        <Typography variant="button">View More</Typography>
                    </Link>
                </Box>
        </Box> 
    )
}

export default TopVideos
