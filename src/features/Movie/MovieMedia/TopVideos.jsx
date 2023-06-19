import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../movieSlice"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import { Card, CardMedia, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ViewMore from "../../../components/Button/ViewMore"
import { topMediaContainersStyles, topVideosStyles } from "../../styles/styles"
import LoadingMediaItem from "../../../components/Loading/LoadingMediaItem"
import { scrollTopWin } from "../../util/helperFunctions"

const TopVideos = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    let videos = movieVideos.results;
    videos = videos.slice(0, 9);
    const isLoading = movieVideos.isLoading;

    useEffect(() => {
        dispatch(getMovieVideos(movieId))
    }, [dispatch, movieId])

    return (
        <Box component="section" sx={topMediaContainersStyles.sectionStyle}>
            <Typography variant="h5" sx={topMediaContainersStyles.sectionTitle}>Videos</Typography>
            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingMediaItem items={5} />}
                {videos.map((video) => {
                    const {key} = video;
                    const videoImgUrl = `https://img.youtube.com/vi/${key}/sddefault.jpg`;

                    return (
                        <Box sx={topVideosStyles.videoContainer}>
                            <Link to={`/movie/${title}/${movieId}/videos`} onClick={scrollTopWin} style={topVideosStyles.videoLink}>
                                <Card sx={topVideosStyles.card}> 
                                    <CardMedia component="img" image={videoImgUrl}/>
                                    <Box aria-label="play/pause"sx={topVideosStyles.playButtonContainer}>
                                        <PlayArrowIcon sx={topVideosStyles.playButtonIcon} />
                                    </Box>
                                </Card>
                            </Link>
                        </Box>
                    )
                })}
            </Box>
            <ViewMore route={`/movie/${title}/${movieId}/videos`} title={"View More"} />
        </Box> 
    )
}

export default TopVideos
