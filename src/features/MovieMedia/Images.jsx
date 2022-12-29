import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import MovieHeader from "../Movie/MovieHeader"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import {Typography} from "@mui/material"
import { Box } from "@mui/system"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"
import {Container} from "@mui/system"


import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
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
    cursor: "pointer"
};

const style = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.9)',
    boxShadow: 24,
    paddingTop: "100px",
    paddingBottom: "100px",
    zIndex: 1,
    overflow: "scroll",
  };
  

const Images = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);
    const { id } = useParams();
    const backdrops = movieImages.backdrops;
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages(id))
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


    // Back and Forward Buttons

    /* const handleBackButton = () => {
        //if (i > backdrops.length) {slideIndex = 1}
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(backdrops.length - 1)
    }

    const handleForwardButton = () => {
        //if (i > backdrops.length) {slideIndex = 1}
        currentIndex > (backdrops.length - 2) ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    } */
    const handleBackForwardButton = (index) => {
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(backdrops.length - 1)
        currentIndex > backdrops.length - 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    };

    const modalBody = (
        <Box style={style}>
            <Button onClick={handleClose} sx={buttonStyle}>
                <CloseIcon />
            </Button>
            <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                }}
            >
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={{color: "#f1f1f1"}}>
                    <ArrowBackIosIcon />
                </Button>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    {backdrops[currentIndex] && (
                        <img src={`https://image.tmdb.org/t/p/original${backdrops[currentIndex].file_path}`} 
                            alt={backdrops[currentIndex].file_path} 
                            style={{width: "80%", height: "50%"}}
                        />
                    )}
                </Box>
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={{color: "#f1f1f1", p: "20px"}}>
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
            <Box sx={{color: "white"}}>hello</Box>
        </Box>
    );

    return (
        <Box>
            <MovieHeader />
            <Container sx={{pt: "30px"}}>
                <Typography variant="h5">Photo Gallery</Typography>
                <Box sx={{ margin: "30px 0"}}>
                    <Grid container spacing={1} sx={{ overflowX: 'auto'}} columns={6} >
                            {backdrops.map((poster, index) => {
                                const { file_path } = poster;
                                const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                                let imgId = uuidv4();

                                return (
                                    <Grid item xs={1} key={imgId}>
                                        <Card sx={{width: "100%", height: '100%', cursor: "pointer"}} onClick={() => handleOpen(index)}>
                                            <CardMedia 
                                                component="img"
                                                image={imageUrl}
                                            />
                                        </Card>
                                    </Grid>
                                )
                            })}
                    </Grid>
                </Box>
            </Container>
            <div className="HOLIIIII">
                <Modal open={open}>   
                    {modalBody}
                </Modal>
            </div>
        </Box>
    )
}

export default Images

