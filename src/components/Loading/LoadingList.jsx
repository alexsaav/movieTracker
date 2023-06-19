import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';

const LoadingList = ({items}) => {

    return (
        <>
            {Array(items).fill(
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