import MovieCardStyle3 from "../MovieCard/MovieCardStyle3";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography"

const MovieCardList = ({movieList, title}) => {

    return (
        <Container sx={{padding: "30px 40px", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold", mb: "40px"}}>{title}</Typography>

            <section sx={{ py: 5, width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Grid container spacing={{ xs: 4, s: 2, md: 3 }} columns={{ xs: 3, sm: 4, md: 6 }} sx={{ flexWrap: "wrap"}}>
                    {movieList.map(movie => {
                        return <MovieCardStyle3 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </section>
        </Container>
    )
}

export default MovieCardList;