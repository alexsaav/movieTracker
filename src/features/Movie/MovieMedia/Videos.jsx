import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../movieSlice"
import { useParams } from "react-router-dom"
import MovieHeader from "../MovieHeader"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import {Container, Card, CardMedia} from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from "@mui/material";
import { getVideosStyle } from "../../../components/Media/mediaStyles"
import ModalSlider from "../../../components/Modal/Modal"
import { v4 as uuidv4 } from 'uuid';


let loadingItem = Array(10).fill((
    <Grid item xs={2}>
        <Skeleton animation="wave" variant="rectangular" width={360} height={200} sx={{borderRadius: 1}} />
    </Grid>
));

const Videos = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    const { id } = useParams();
    let videos = movieVideos.results;
    let isLoading = movieVideos.isLoading;

    const theme = useTheme();
    const videosStyle = getVideosStyle(theme);

    useEffect(() => {
        dispatch(getMovieVideos(id))
    }, [dispatch, id])

    // set new current index
    const handleOpen = (i) => {
        setCurrentIndex(i);
        setOpen(true)
    };

    // reset current index
    const handleClose = () => {
        setCurrentIndex(null);
        setOpen(false)
    };

    const handleBackForwardButton = (index) => {
        if(index < 0) {
            index = videos.length - 1;
        }
        if (index > videos.length - 1) {
            index = 0;
        }
        setCurrentIndex(index)
    };

/*     const modalBody = (
        <Box sx={modalStyle.container}>
            <IconButton onClick={handleClose} sx={modalStyle.closeButton}>
                <CloseIcon />
            </IconButton>
            <Box sx={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        height: "inherit"
                    }}
            >
                <IconButton onClick={() => handleBackForwardButton(currentIndex)} sx={{color: "#f1f1f1"}}>
                    <ArrowBackIosIcon />
                </IconButton>

                <Box style={{
                            display: "flex", 
                            justifyContent: "center", 
                            position: "relative", 
                            height: "80%", 
                            width: "80%"
                        }} 
                >
                    {videos[currentIndex] && ( 
                        <iframe
                        src={`https://www.youtube.com/embed/${videos[currentIndex].key}`}
                        title={`https://www.youtube.com/embed/${videos[currentIndex].name}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        style={{
                                width: "80%", 
                                height: "80%", 
                                border: 0, 
                                top: 0, 
                                left: 0, 
                                alignSelf: "center", 
                                overflow: "hidden"
                            }}
                        >
                        </iframe>
                    )}
                </Box>
                
                <IconButton onClick={() => handleBackForwardButton(currentIndex)} sx={{color: "#f1f1f1", p: "20px"}}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>

    ) */

    const mediaContent = 
        <>
            {videos[currentIndex] && ( 
                <iframe
                    src={`https://www.youtube.com/embed/${videos[currentIndex].key}`}
                    title={`https://www.youtube.com/embed/${videos[currentIndex].name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    style={videosStyle.videoModal}
                    id="ytplayer" 
                    type="text/html"
                    frameborder="0"
                >
                </iframe>
            )}
        </>;

    return (
        <Box sx={videosStyle.container}>
            <MovieHeader />
            <Container sx={videosStyle.innerContainer}>
                <Typography variant="h5">Videos</Typography>
                    <Box sx={videosStyle.videosWrapper}>
                        <Grid container spacing={1} columns={{xs: 1, sm: 2, md: 3}}>
                            {isLoading && loadingItem}
                            {videos.map((video, index) => {
                                const { id, key, name, site } = video;
                                const videoImgUrl = `https://img.youtube.com/vi/${key}/sddefault.jpg`

                                return (
                                    <Grid item xs={1} key={id}>
                                        <Card sx={videosStyle.videoWrapper} onClick={() => handleOpen(index)}> 
                                            <CardMedia
                                                component="img"
                                                image={videoImgUrl}
                                            />
                                            <Box aria-label="play/pause" sx={videosStyle.video}>
                                                <PlayArrowIcon sx={videosStyle.playIcon} />
                                            </Box>
                                        </Card> 
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
            </Container>      

            <ModalSlider 
                isOpen={open}
                currentIndex={currentIndex}
                handleClose={handleClose}
                handleBackForwardButton={handleBackForwardButton}
                isMovie={true}
            >
                    {mediaContent}
            </ModalSlider>    

        </Box> 
    )
}

export default Videos