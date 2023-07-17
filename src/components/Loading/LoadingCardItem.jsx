import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';

const LoadingCardItem = ({items}) => {

    return (
        <>
            {Array(items).fill().map(() =>
                <Box sx={{width: 150, position: "relative"}}>
                    <Skeleton animation="wave" variant="rectangular" height={225} sx={{mr: 1, borderRadius: 2}} />
                    <Box>
                        <Skeleton animation="wave" height={20} width="70%" sx={{borderRadius: 2}}/>
                        <Skeleton animation="wave" height={20} width="70%" sx={{borderRadius: 2}}/>
                    </Box>
                </Box>
            )}
        </>
    )
}



export default LoadingCardItem;