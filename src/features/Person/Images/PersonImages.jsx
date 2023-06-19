import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPersonImages, getPersonTaggedImages, selectPersonImages, selectPersonTaggedImages } from "../../Person/personSlice"
import { useParams } from "react-router-dom"
import Images from "../../../components/Media/Images.jsx";

const PersonImages = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { id, name } = useParams();

    useEffect(() => {
        dispatch(getPersonImages(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getPersonTaggedImages({personId: id, page}))
    }, [dispatch, page, id])
    
    const personImages = useSelector(selectPersonImages);
    const personImagesResult = personImages.profiles;
    const isLoadingImage = personImages.isLoading;

    const taggedImages = useSelector(selectPersonTaggedImages);
    const taggedImagesResult = taggedImages.results;
    //const isLoadingTaggedImages = personImages.isLoading;

    const images = personImagesResult.concat(taggedImagesResult)

    return (
        <Images isLoading={isLoadingImage} images={images} name={name} id={id} />
    )
}

export default PersonImages

