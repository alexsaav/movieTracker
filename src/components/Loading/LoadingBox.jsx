import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { v4 as uuidv4 } from 'uuid';

const loadingBoxStyles = {
    outerContainer: {
        display: "flex",
        justifyContent: "space-around", 
        alignItems: "center",
        p: "40px 30px",
        background: "#36393A"
    },
    innerContainer: {
        display: "flex", 
        flexDirection: "column", 
        p: "0px 10px", 
        width: "600px"
    },
    textContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        ml: 1, 
        mt: "7px"
    },
    pictureSkeletonContainer: {
        display: "flex",
        width: "35%"
    },
    skeletonSubtitle: {
        width: "100%",
        height: 20,
        mb: "10px"
    },
    skeletonText: {
        width: "100%",
        height: 70,
        mb: "10px"
    },

}

const LoadingBox = (items) => {
    const loadingItem = Array(items).fill(
        <Box sx={loadingBoxStyles.textContainer}>
            <Skeleton animation="wave" variant="h2" sx={loadingBoxStyles.skeletonSubtitle}/>
            <Skeleton animation="wave" variant="rectangle" sx={loadingBoxStyles.skeletonText}/>
        </Box>
    );

    return (
        <Box sx={loadingBoxStyles.outerContainer}>
            <Box style={loadingBoxStyles.pictureSkeletonContainer}>
                <Skeleton animation="wave" variant="rounded" width={300} height={450} />
            </Box>
        
            <Box sx={loadingBoxStyles.innerContainer}>
                <Skeleton animation="wave" variant="h1" height={50} sx={{ml: 1, mb: 2}}/>
                <>{loadingItem}</>
            </Box>
        </Box>
    )
}

export default LoadingBox