import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, movie, selectImages } from "../movieSlice"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Images from "../../../components/Media/Images";
  

const MovieImages = () => {
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

    return (
        <Images movie={true} isLoading={isLoading} images={backdrops} />
    )
}

export default MovieImages