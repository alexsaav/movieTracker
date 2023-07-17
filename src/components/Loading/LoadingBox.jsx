import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { loadingBoxStyles } from './loadingItems';
import { v4 as uuidv4 } from 'uuid';

const LoadingBox = (items) => {
    const loadingItem = Array(items).fill().map(() =>
        <Box sx={loadingBoxStyles.textContainer} key={uuidv4()}>
            <Skeleton animation="wave" variant="h2" sx={loadingBoxStyles.subtitle}/>
            <Skeleton animation="wave" variant="rectangle" sx={loadingBoxStyles.text}/>
        </Box>
    );

    return (
        <Box sx={loadingBoxStyles.outerContainer}>
            <Box style={loadingBoxStyles.pictureContainer}>
                <Skeleton animation="wave" variant="rounded" width={300} height={450} />
            </Box>
        
            <Box sx={loadingBoxStyles.innerContainer}>
                <Skeleton animation="wave" variant="h1" height={50} sx={loadingBoxStyles.title}/>
                <>{loadingItem}</>
            </Box>
        </Box>
    )
}

export default LoadingBox