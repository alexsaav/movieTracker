import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const LoadingBox = () => {
    const loadingItem = Array(3).fill(
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", ml: 1, mt: "7px"}}>
            <Skeleton animation="wave" variant="h2" width="100%" height={20} sx={{mb: "10px"}}/>
            <Skeleton animation="wave" variant="rectangle" width="100%" height={70}  sx={{mb: "10px"}}/>
        </Box>
    );

    return (
        <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center", p: "40px 30px"}}>
            <Box style={{display: "flex", width: "35%"}}>
                <Skeleton animation="wave" variant="rounded" width={300} height={450} />
            </Box>
        
            <Box sx={{display: "flex", flexDirection: "column", p: "0px 10px", width: "600px"}}>
                <Skeleton animation="wave" variant="h1" height={50} sx={{ml: 1, mb: 2}}/>
                <>{loadingItem}</>
            </Box>
        </Box>
    )
}

export default LoadingBox