import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Skeleton from "@mui/material/Skeleton";

const LoadingGridItem = ({items}) => {
    return (
        <>
            {Array(items).fill((
                <Grid item xs={1}>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={150} sx={{borderRadius: 1}} />
                </Grid>
            ))}
        </>
    )
}

export default LoadingGridItem