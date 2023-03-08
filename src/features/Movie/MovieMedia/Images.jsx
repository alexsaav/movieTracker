import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, movie, selectImages } from "../movieSlice"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import MovieHeader from "../MovieHeader"
import LoadingGridItem from "../../../components/Loading/LoadingGridItem";
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box"
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia"
import Container from "@mui/system/Container"
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    top: '0',
    left: '0',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.9)',
    boxShadow: 24,
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
    const isLoading = movieImages.isLoading;   
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages(id))
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
                    justifyContent: "space-between",
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
        </Box>
    );

    return (
        <Box>
            <MovieHeader />
            <Container sx={{pt: "30px"}}>
                <Typography variant="h5">Photo Gallery</Typography>

                <Box sx={{ margin: "30px 0"}}>
                    
                    <Grid container spacing={1} sx={{ overflowX: 'auto'}} columns={5} >
                        {isLoading && <LoadingGridItem items={20} />}
                        {backdrops.map((poster, index) => {
                            const { file_path } = poster;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                            
                            return (
                                <Grid item xs={1} key={file_path}>
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

            <Box>
                <Modal open={open}>   
                    {modalBody}
                </Modal>
            </Box>
        </Box>
    )
}

export default Images

