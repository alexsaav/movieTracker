import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';
import { loadingListStyles } from "./loadingItems";

const LoadingList = ({items}) => {

    return (
        <>
            {Array(items).fill().map(() =>
                (<Box sx={loadingListStyles.container} key={uuidv4()}>
                    <Skeleton animation="wave" variant="circular" width={56} height={56} />
                    <Box sx={loadingListStyles.innerBox}>
                        <Skeleton animation="wave" variant="h1" height={15} width={200} sx={loadingListStyles.innerBoxItem} />
                        <Skeleton animation="wave" variant="h2" height={15} width={200} /> 
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default LoadingList