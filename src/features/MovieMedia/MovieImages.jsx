import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const MovieImages = ({movieId}) => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);

    //const backdrops = movieImages.backdrops;
    //const logos = movieImages.logos; 
    const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages({movieId}))
    }, [dispatch, movieId])

    return (
        <Box>
            <Typography>Images</Typography>
            <ImageList cols={6} rowHeight={150} variant="standard">
                {posters.map(poster => {
                    const { file_path } = poster;
                    const movieImagesUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                    return (
                        <ImageListItem rows={2}>
                            <img
                                src={movieImagesUrl}
                                srcSet={movieImagesUrl}
                                alt=""
                                style={{height: "100%"}}                                
                            />
                        </ImageListItem>
                    )
                })}
            </ImageList>
        </Box>
    )
}

export default MovieImages