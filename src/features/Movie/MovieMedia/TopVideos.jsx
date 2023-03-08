import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../movieSlice"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import { Card, CardMedia, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Skeleton from '@mui/material/Skeleton';

let loadingItem = Array(5).fill(
    <Skeleton animation="wave" variant="rectangular" width="100%" height={250} sx={{mr: 1, borderRadius: 1}} />
    );

const TopVideos = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    let videos = movieVideos.results;
    videos = videos.slice(0, 9);
    const isLoading = movieVideos.isLoading;

    useEffect(() => {
        dispatch(getMovieVideos(movieId))
    }, [dispatch, movieId])

    const scrollTopWin = () => {
        window.scrollTo(200, 0);
    }

    return (
        <section style={{padding: "30px 0"}}>
            <Typography variant="h5">Videos</Typography>
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
                {videos.map((video) => {
                    const {key} = video;
                    const videoImgUrl = `https://img.youtube.com/vi/${key}/sddefault.jpg`;

                    return (
                        <Box sx={{p: "0 5px", width: "400px"}}>
                            <Link to={`/movie/${title}/${movieId}/videos`} onClick={scrollTopWin} style={{textDecoration: 'none', color: '#1D1F20'}}>
                                <Card sx={{minWidth: "360px", maxWidth: "400px",  height: "250px", position: "relative" }}> 
                                    <CardMedia
                                        component="img"
                                        image={videoImgUrl}
                                    />
                                    <Box aria-label="play/pause"
                                        sx={{
                                            padding: "0 7px", background: 'rgba(0, 0, 0, 0.5)',
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
                        </Box>
                    )
                })}
            </Box>
            <Box>
                <Link to={`/movie/${title}/${movieId}/videos`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                    <Typography variant="button">View More</Typography>
                </Link>
            </Box>
        </section> 
    )
}

export default TopVideos
