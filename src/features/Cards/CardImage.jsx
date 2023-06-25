import React from 'react'
import { Box, CardMedia } from "@mui/material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { imageNotFound } from './cardStyles';


const CardImage = ({ poster, backdrop, profilePicture, title, classes, classesNotFound, onClick }) => {
    //const { poster_path, backdrop_path, profile_path, title } = props;
    let image;

    if (poster || backdrop || profilePicture) {
        const moviePosterUrl = `https://image.tmdb.org/t/p/original${poster ?? backdrop ?? profilePicture}`;
        image = <CardMedia
                    component="img"
                    image={moviePosterUrl}
                    alt={title}
                    sx={classes}
                    onClick={onClick}
                /> 
    } else {
        image = <Box sx={classesNotFound}>
                    <ImageNotSupportedIcon color="disabled" sx={imageNotFound.image}/>
                </Box> 
    }

    return <>{image}</>     
}

export default CardImage