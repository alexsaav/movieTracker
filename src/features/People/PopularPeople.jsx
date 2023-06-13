import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getPopularPeople, selectPopularPeople } from "./personSlice"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const PopularPeople = (personId) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popularPeople = useSelector(selectPopularPeople);
    const popularPeopleResult = popularPeople.results;
    
    console.log(popularPeople)

    useEffect(() => {
        dispatch(getPopularPeople(page))
    }, [dispatch, page])

    const handlePageChange = () => {
        setPage([page] + 1);
    }

    return (
        <>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Known For</Typography>
            <Box>
                {popularPeopleResult.map(people => {
                    const { id, known_for, backdrop_path, name } = people;
                    const imageUrl = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
                    return (
                        <>
                            <Box>
                                return (
                                    <Box sx={{p: "0 5px", maxWidth: "400px"}}>
                                    <Link to={`/movie/${id}`}>
                                        <Card 
                                                sx={{width: 260, borderRadius: 3, position: "relative"}}
                                            >
                                                <CardMedia 
                                                    component="img"
                                                    image={imageUrl}
                                                    alt=""
                                                />
                                                <Box sx={{padding: "0 7px", background: 'rgba(0, 0, 0, 0.5)',
                                                    position: "absolute",
                                                    color: "#F7F7F8",
                                                    textDecoration: "none",
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    paddingBottom: 1
                                                }}>
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        display="block" 
                                                        gutterBottom
                                                        sx={{mb: 0, textDecoration: "none", paddingBottom: 0}}
                                                    >
                                                        {name}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                    </Link>
                                </Box>
                                )
                            </Box>
                        </>
                    )
                })}
            </Box>
        </>
    )
}

export default PopularPeople