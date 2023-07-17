import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';
import { loadingList } from "./loadingItems";

const LoadingList = ({items}) => {

    return (
        <>
            {Array(items).fill().map(() =>
                (<Box sx={loadingList.container} key={uuidv4()}>
                    <Skeleton animation="wave" variant="circular" width={56} height={56} />
                    <Box sx={loadingList.innerBox}>
                        <Skeleton animation="wave" variant="h1" height={15} width={200} sx={loadingList.innerBoxItem} />
                        <Skeleton animation="wave" variant="h2" height={15} width={200} /> 
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default LoadingList