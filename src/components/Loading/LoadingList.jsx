import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const LoadingList = () => {
    return (
        <>
            {Array(10).fill(
                (<Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
                    <Skeleton animation="wave" variant="circular" width={56} height={56} />
                    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", ml: 1}}>
                        <Skeleton animation="wave" variant="h1" height={15} width={200} sx={{ marginBottom: 1 }} />
                        <Skeleton animation="wave" variant="h2" height={15} width={200} /> 
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default LoadingList