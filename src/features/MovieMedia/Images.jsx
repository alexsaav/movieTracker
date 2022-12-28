import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link, useParams } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import {Typography} from "@mui/material"
import { Box } from "@mui/system"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"
import MovieHeader from "../Movie/MovieHeader"

const Images = () => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);
    const { id } = useParams;
    const backdrops = movieImages.backdrops;
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages({id}))
    }, [dispatch, id])

    return (
        <Box>
            <MovieHeader />
            <Typography variant="h5">Images</Typography>
            <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                <Grid container wrap="nowrap" spacing={63} sx={{ overflowX: 'auto'}} columns={6} >
                        {backdrops.map((poster) => {
                            const { file_path } = poster;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                        return (
                            <Grid item xs={4}>
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
        </Box>
    )
}

export default Images
