import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import {Typography} from "@mui/material"
import { Box } from "@mui/system"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"
import {Container} from "@mui/system"
import MovieHeader from "../Movie/MovieHeader"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Images = () => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);
    const { id } = useParams();
    const navigate = useNavigate();
    const backdrops = movieImages.backdrops;
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;
    console.log(backdrops)

    useEffect(() => {
        dispatch(getMovieImages(id))
    }, [dispatch, id])

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
                                    <Grid item xs={1}>
                                        <Card sx={{width: "100%", height: '100%'}} onClick={() => navigate(`/image/${imgId}`)}>
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
        </Box>
    )
}

export default Images
