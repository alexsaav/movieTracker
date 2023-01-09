import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPersonImages, getPersonTaggedImages, selectPersonImages, selectPersonTaggedImages } from "./personSlice"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import MovieHeader from "../Movie/MovieHeader"
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
  

const PersonImages = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);
    const dispatch = useDispatch();
    const { id, name } = useParams();
    const navigate = useNavigate();

    const personImages = useSelector(selectPersonImages);
    const personImagesResult = personImages.profiles;

    const taggedImages = useSelector(selectPersonTaggedImages);
    const taggedImagesResult = taggedImages.results;

    const images = personImagesResult.concat(taggedImagesResult)

    console.log(images)

    useEffect(() => {
        dispatch(getPersonImages(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getPersonTaggedImages({personId: id, page}))
    }, [dispatch, page, id])


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
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(images.length - 1)
        currentIndex > images.length - 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
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
                    height: "60%"
                }}
            >
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={{color: "#f1f1f1"}}>
                    <ArrowBackIosIcon />
                </Button>
                <Box sx={{display: "flex", justifyContent: "center", height: "100%"}}>
                    {images[currentIndex] && (
                        <img src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`} 
                            alt={images[currentIndex].file_path} 
                            style={{width: "100%", height: "100%"}}
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
        <>
            <Container sx={{pt: "30px"}}>
                <Typography 
                    variant="h1" 
                    onClick={() => navigate(`/person/${id}/${name}`)} 
                    sx={{cursor: "pointer", fontSize: "2rem", fontWeight: "bold", pb: "10px", "&:hover": {color: "#9F5BB0"}}}
                >
                    {name}
                </Typography>
                <Typography variant="h2" sx={{fontSize: "1.5rem"}}>Photo Gallery</Typography>
                <Box sx={{ margin: "30px 0"}}>
                    <Grid container spacing={1} sx={{ overflowX: 'auto'}} columns={6} >
                        <>
                            {images.map((photo, index) => {
                                const { file_path } = photo;
                                const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                                let imgId = uuidv4();

                                return (
                                    <Grid item xs={1} key={imgId}>
                                        <Card sx={{cursor: "pointer", width: "100%", height: "100%"}} onClick={() => handleOpen(index)}>
                                            <CardMedia 
                                                component="img"
                                                image={imageUrl}
                                                sx={{height: "100%", width: "100%"}}
                                            />
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </>
                    </Grid>
                </Box>
            </Container>
            <div>
                <Modal open={open}>   
                    {modalBody}
                </Modal>
            </div>
        </>
    )
}

export default PersonImages

