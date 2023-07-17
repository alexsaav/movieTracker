import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from 'uuid';

const LoadingMediaItem = ({items}) => {
    return (
        <>
            {Array(items).fill().map(() =>
                <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="100%" 
                    height={250} 
                    sx={{mr: 1, borderRadius: 1}} 
                    key={uuidv4()}
                />
            )}
        </>
    )
}

export default LoadingMediaItem