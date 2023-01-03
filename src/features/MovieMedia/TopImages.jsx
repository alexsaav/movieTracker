import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import {Typography} from "@mui/material"
import { Box } from "@mui/system"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"

const TopImages = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);

    let backdrops = movieImages.backdrops;
    backdrops = backdrops.slice(0, 9);
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages(movieId))
    }, [dispatch, movieId])

    const scrollTopWin = () => {
        window.scrollTo(200, 0);
    }

    return (
        <Box sx={{padding: "30px 0"}}>
            <Typography variant="h5">Images</Typography>
            <Box sx={{margin: "30px 0", overflowY: "hidden"}}>
                <Grid container wrap="nowrap" spacing={63} sx={{ overflowX: 'auto'}} columns={6} >
                        {backdrops.map((poster) => {
                            const { file_path } = poster;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                            return (
                                <Grid item xs={4} key={file_path} >
                                    <Card 
                                        sx={{width: 500, height: '100%'}}
                                    >
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
            <Box sx={{mt: 4}}>
                <Link 
                    to={`/movie/${movieId}/images`} 
                    onClick={scrollTopWin} 
                    style={{textDecoration: 'none', color: '#1D1F20'}}
                >
                    <Typography variant="button">View More</Typography>
                </Link>
            </Box>
        </Box>
    )
}

export default TopImages
