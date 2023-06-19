import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPopularPeople, selectPopularPeople } from './peopleSlice'
import PersonCard from "../Cards/PersonCard";
import PaginationComponent from "../../components/Pagination/Pagination";
import { Container, Grid, Toolbar, Typography } from "@mui/material";

const PopularPeople = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const popularPeople = useSelector(selectPopularPeople);
    const popularPeopleResult = popularPeople.results;

    useEffect(() => {
        dispatch(getPopularPeople(page))
    }, [dispatch, page])

    return (
        <Container sx={{}}>
            <Toolbar />
            <Typography variant="h1" sx={{fontSize: "2rem", fontWeight: "bold", pb: 3}}>Popular People</Typography>
            <Grid container='true' columns={{xs: 2, sm: 4, md: 6}}>
                {popularPeopleResult?.map(people => {
                    return (
                        <Grid item='true' xs={1}>
                            <PersonCard  results={people} />
                        </Grid>
                    )
                })}
            </Grid>
            <PaginationComponent 
                totalPages={popularPeople.total_pages} 
                setPage={setPage} 
                page={page} 
            />
        </Container>
    )
}

export default PopularPeople