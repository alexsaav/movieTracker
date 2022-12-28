import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideos, selectVideos } from "../Movie/movieSlice"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

const MovieVideos = ({movieId, title}) => {
    const dispatch = useDispatch();
    const movieVideos = useSelector(selectVideos);
    let videos = movieVideos.results;
    videos = videos.slice(0, 9);
    console.log(videos)

    useEffect(() => {
        dispatch(getMovieVideos({movieId}))
    }, [dispatch, movieId])


    return (
        <Box sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h5">Videos</Typography>
                <Box sx={{ margin: "30px 0", overflowY: "hidden", overflowX: "scroll"}}>
                    <Grid container wrap="nowrap" spacing={71} sx={{ overflowX: 'auto'}} columns={6} >
                        {videos.map((video) => {
                            const { id, key, name, site } = video;
                            const videoUrl = `https://www.youtube.com/embed/${key}`;

                            return (
                                <Grid item xs={4} key={id}>
                                    <Link to={`/video/${id}`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                                        <iframe 
                                            width="560" 
                                            height="315" 
                                            src={videoUrl} 
                                            title={name} 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen
                                        >
                                        </iframe>
                                    </Link>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box sx={{mt: 4}}>
                        <Link to={`/movie/${title}-${movieId}/videos`} style={{textDecoration: 'none', color: '#1D1F20'}}>
                            <Typography variant="button">View More</Typography>
                        </Link>
                    </Box>
                </Box>
        </Box> 
    )
}

export default MovieVideos


