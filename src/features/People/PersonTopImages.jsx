import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getPersonImages, getPersonTaggedImages, selectPersonImages, selectPersonTaggedImages } from "./personSlice"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const PersonTopImages = ({personId, name}) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const personImages = useSelector(selectPersonImages);
    const personImagesResult = personImages.profiles;
    const personTopImages = personImagesResult.slice(0, 9);

    const taggedImages = useSelector(selectPersonTaggedImages);
    const taggedImagesResult = taggedImages.results;
    const topTaggedImages = taggedImagesResult.slice(0, 9);

    //const totalPages = taggedImages.total_pages-1;

    useEffect(() => {
        dispatch(getPersonImages(personId))
    }, [])

    useEffect(() => {
        dispatch(getPersonTaggedImages({personId, page}))
    }, [dispatch, page, personId])

    return (
        <section style={{padding: "30px 0"}}>
            <Typography variant="h2" sx={{fontSize: "2rem", fontWeight: "bold"}}>Photos</Typography>
            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                    }}
            >
                    <>
                        {personTopImages.map((photo) => {
                            const { file_path } = photo;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                            return (
                                <Box sx={{p: "0 5px", maxWidth: "400px"}}>
                                    <Card 
                                        sx={{width: "300px", height: "300px"}}
                                    >
                                        <CardMedia 
                                            component="img"
                                            image={imageUrl}
                                            sx={{height: "100%",  width: "100%"}}
                                        />
                                    </Card>
                                </Box>
                            )
                        })}
                    </>
                    <>
                        {topTaggedImages.map(photo => {
                            const { file_path } = photo;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                            return (
                                <Box sx={{p: "0 5px", maxWidth: "400px"}}>
                                    <Card 
                                        sx={{width: "300px", height: "300px"}}
                                    >
                                        <CardMedia 
                                            component="img"
                                            image={imageUrl}
                                            sx={{height: "100%", width: "100%"}}
                                        />
                                    </Card>
                                </Box>
                            )
                        })}
                    </>
                    
            </Box>
            <Box sx={{mt: 4}}>
                <Link to={`/photos/${id}/${name}`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                    <Typography variant="button">View More</Typography>
                </Link>
            </Box>
        </section>
    )
}

export default PersonTopImages
