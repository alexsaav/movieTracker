import Skeleton from "@mui/material/Skeleton";

const LoadingMediaItem = ({items}) => {
    return (
        <>
            {Array(items).fill(
                <Skeleton animation="wave" variant="rectangular" width="100%" height={250} sx={{mr: 1, borderRadius: 1}} />
            )}
        </>
    )
}

export default LoadingMediaItem