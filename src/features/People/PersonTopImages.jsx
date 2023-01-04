import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getPersonImages, getPersonTaggedImages, selectPersonImages, selectPersonTaggedImages } from "./personSlice"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
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
        <Box sx={{padding: "30px 0"}}>
            <Typography variant="h5">Photos</Typography>
            <Box sx={{margin: "30px 0", overflowY: "hidden"}}>
                <Grid container wrap="nowrap" spacing={38} sx={{ overflowX: 'auto'}} columns={6} >
                    <>
                        {personTopImages.map((photo) => {
                            const { file_path } = photo;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                            return (
                                <Grid item xs={1} key={file_path}>
                                    <Card 
                                        sx={{width: "300px", height: "300px"}}
                                    >
                                        <CardMedia 
                                            component="img"
                                            image={imageUrl}
                                            sx={{height: "100%",  width: "100%"}}
                                        />
                                    </Card>
                                </Grid>
                            )
                        })}
                    </>
                    <>
                        {topTaggedImages.map(photo => {
                            const { file_path } = photo;
                            const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                            return (
                                <Grid item xs={1} key={file_path}>
                                    <Card 
                                        sx={{width: "300px", height: "300px"}}
                                    >
                                        <CardMedia 
                                            component="img"
                                            image={imageUrl}
                                            sx={{height: "100%", width: "100%"}}
                                        />
                                    </Card>
                                </Grid>
                            )
                        })}
                    </>
                    
                </Grid>
            </Box>
            <Box sx={{mt: 4}}>
                <Link to={`/photos/${id}/${name}`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                    <Typography variant="button">View More</Typography>
                </Link>
            </Box>
        </Box>
    )
}

export default PersonTopImages
