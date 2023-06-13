import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../movieSlice"
import {Typography} from "@mui/material"
import { Box } from "@mui/system"
import { Card } from '@mui/material';
import {CardMedia} from "@mui/material"
import LoadingMediaItem from "../../../components/Loading/LoadingMediaItem"
import { topImagesStyles } from "../../styles/styles"
import ViewMore from "../../../components/Button/ViewMore"
import { topMediaContainersStyles } from "../../styles/styles"

const TopImages = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieImages = useSelector(selectImages);
    let isLoading = movieImages.isLoading;
    let backdrops = movieImages.backdrops;
    backdrops = backdrops.slice(0, 9);
    //const logos = movieImages.logos; 
    //const posters = movieImages.posters;

    useEffect(() => {
        dispatch(getMovieImages(movieId))
    }, [dispatch, movieId])

    return (
        <Box component="section" sx={topMediaContainersStyles.sectionStyle}>
            <Typography variant="h5" sx={topMediaContainersStyles.sectionTitle}>Images</Typography>
            <Box sx={topMediaContainersStyles.innerContainer}>
                {isLoading && <LoadingMediaItem items={5} />}
                {backdrops.map((poster) => {
                    const { file_path } = poster;
                    const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                    return (
                        <Box sx={topImagesStyles.imageContainer}>
                            <Card key={file_path}>
                                <CardMedia 
                                    component="img"
                                    image={imageUrl}
                                    sx={topImagesStyles.image}
                                />
                            </Card>
                        </Box>
                    )
                })}
            </Box>

            <ViewMore route={`/movie/${movieId}/images`} title={"View More"} />
        </Box>
    )
}

export default TopImages
