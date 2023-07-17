import CardStyle2 from "../Cards/CardStyle2";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { v4 as uuidv4 } from 'uuid';


let loadingItem = Array(20).fill().map(() =>
    (<Grid item xs={1} key={uuidv4()}>
        <Skeleton animation="wave" variant="rectangular" height={225} sx={{mr: 1, borderRadius: 2}} />
        <Box>
            <Skeleton animation="wave" height={20} width="70%" sx={{borderRadius: 1}} />
            <Skeleton animation="wave" height={20} width="70%" sx={{borderRadius: 1}} />
        </Box>
    </Grid>
));


//used in components: popular movies, top rated, upcoming

const MovieCardList = ({movieList, title, isLoading}) => {

    return (
        <Container sx={{padding: "30px 40px", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold", mb: "40px"}}>{title}</Typography>

            <section sx={{ py: 5, width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Grid container spacing={2} columns={{ xs: 3, sm: 4, md: 6 }} sx={{ flexWrap: "wrap", justifyContent: 'center'}}>
                    {isLoading && loadingItem}
                    {movieList.map(movie => {
                        return <CardStyle2 movie={movie} key={movie.id}/>
                    })}
                </Grid>
            </section>
        </Container>
    )
}

export default MovieCardList;


