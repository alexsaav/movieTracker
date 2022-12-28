import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Button, Typography } from "@mui/material"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"

const MovieImages = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);

    let backdrops = movieImages.backdrops;
    backdrops = backdrops.slice(0, 9);
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages({movieId}))
    }, [dispatch, movieId])

    return (
        <Box sx={{padding: "30px 0"}}>
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
                <Box sx={{mt: 4}}>
                    <Link to={`/movie/${title}-${movieId}/images`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                        <Typography variant="button">View More</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default MovieImages
