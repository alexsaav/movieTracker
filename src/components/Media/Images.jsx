import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
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
import LoadingGridItem from "../Loading/LoadingGridItem";
import MovieHeader from "../../features/Movie/MovieHeader";
import { useTheme } from "@mui/material";
import { getImagesStyle, getModalStyleImages } from "../../features/People/peopleStyles";

const Images = ({movie, images, isLoading, name, id}) => {
    const [open, setOpen] = useState(false);
    //const [page, setPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);
    const navigate = useNavigate();
    
    const theme = useTheme();
    const modalStyle = getModalStyleImages(theme); 
    const imagesStyle = getImagesStyle(theme);

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
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(images.length - 1)
        currentIndex > images.length - 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    };

    const modalBody = (
        <Box style={modalStyle.container}>
            <Button onClick={handleClose} sx={modalStyle.closeButton}>
                <CloseIcon />
            </Button>
            <Box sx={modalStyle.imagesContainer}
            >
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={modalStyle.arrowButton}>
                    <ArrowBackIosIcon />
                </Button>
                <Box sx={modalStyle.imagesInnerContainer}>
                    {images[currentIndex] && (
                        <img src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`} 
                            alt={images[currentIndex].file_path} 
                            style={modalStyle.image}
                        />
                    )}
                </Box>
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={modalStyle.arrowButton}>
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        </Box>
    );

    const columns = movie ? { xs: 1, sm: 2, md: 3 } : { xs: 2, sm: 4, md: 6 };

    return (
        <>
            {movie && <MovieHeader /> }
            <Container sx={imagesStyle.container}>
                <Typography 
                    variant="h1" 
                    onClick={() => navigate(`/person/${id}/${name}`)} 
                    sx={imagesStyle.title}
                >
                    {!movie && name}
                </Typography>
                <Typography variant="h2" sx={imagesStyle.subtitle}>Photo Gallery</Typography>
                <Box sx={imagesStyle.imagesContainer}>
                    
                    <Grid container spacing={1} sx={imagesStyle.imagesInnerContainer} columns={columns} >
                        {isLoading  && <LoadingGridItem items={30} />}
                        <>
                            {images.map((photo, index) => {
                                const { file_path } = photo;
                                const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                                let imgId = uuidv4();

                                return (
                                    <Grid item xs={1} key={imgId}>
                                        <Card sx={imagesStyle.imageContainer} onClick={() => handleOpen(index)}>
                                            <CardMedia 
                                                component="img"
                                                image={imageUrl}
                                                sx={imagesStyle.imageInnerContainer}
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

export default Images