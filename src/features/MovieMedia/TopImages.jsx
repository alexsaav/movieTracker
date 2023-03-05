import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieImages, selectImages } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
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
        <section style={{padding: "30px 0"}}>
            <Typography variant="h5">Images</Typography>
            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                    }}
            >
                {backdrops.map((poster) => {
                    const { file_path } = poster;
                    const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;

                    return (
                        <Box sx={{p: "0 5px", maxWidth: "400px"}}>
                            <Card key={file_path}>
                                <CardMedia 
                                    component="img"
                                    image={!imageUrl}
                                    sx={{width: "450px", height: "250px"}}
                                />
                            </Card>
                        </Box>
                    )
                })}
            </Box>

            <Box>
                <Link 
                    to={`/movie/${movieId}/images`} 
                    onClick={scrollTopWin} 
                    style={{textDecoration: 'none', color: '#1D1F20'}}
                >
                    <Typography variant="button">View More</Typography>
                </Link>
            </Box>
        </section>
    )
}

export default TopImages
