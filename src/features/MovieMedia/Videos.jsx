import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../Movie/movieSlice"
import { Link, useParams } from "react-router-dom"
import MovieHeader from "../Movie/MovieHeader"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import {Container, Card, CardMedia} from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const buttonStyle = {
    position: "absolute",
    top: "50px",
    right: "35px",
    color: "#f1f1f1",
    fontSize: "40px",
    fontWeight: "bold",
    transition: "0.3s",
    textDecoration: "none",
};

const style = {
    display: "flex",
    flexDirection: "column",
    top: '0',
    left: '0',
    height: "100%",
    padding: "30px",
    backgroundColor: 'rgba(0,0,0,0.9)',
    boxShadow: 24,
    zIndex: 1,
    overflow: "scroll",
};

const Videos = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    const { id } = useParams();
    let videos = movieVideos.results;

    console.log(videos)

    useEffect(() => {
        dispatch(getMovieVideos(id))
    }, [dispatch, id])

    // set new current index
    const handleOpen = (i) => {
        console.log(i)
        setCurrentIndex(i);
        setOpen(true)
    };

    // reset current index
    const handleClose = () => {
        setCurrentIndex(null);
        setOpen(false)
    };

    const handleBackForwardButton = (index) => {
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(videos.length - 1)
        currentIndex > videos.length - 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    };

    const modalBody = (
        <Box sx={style} className="MODAL2">
            <IconButton onClick={handleClose} sx={buttonStyle}>
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
                    {videos[currentIndex] && (<iframe
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

    )

    return (
        <Box sx={{padding: "30px 0", display: "block"}}>
            <MovieHeader />
            <Container sx={{pt: "30px"}}>
                <Typography variant="h5">Videos</Typography>
                    <Box sx={{ margin: "30px 0"}}>
                        <Grid container spacing={1} sx={{ overflowX: 'auto'}} columns={6} >
                            {videos.map((video, index) => {
                                const { id, key, name, site } = video;
                                //const videoUrl = `https://www.youtube.com/embed/${key}`;
                                const videoImgUrl = `https://img.youtube.com/vi/${key}/sddefault.jpg`

                                return (
                                    <Grid item xs={2} key={id}>
                                        <Card sx={{minWidth: "360px", position: "relative", cursor: "pointer"}} onClick={() => handleOpen(index)}> 
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
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
            </Container>
            <Modal open={open}>   
                {modalBody }
            </Modal>
        </Box> 
    )
}

export default Videos
