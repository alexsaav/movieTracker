import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';

export const LoadingRecommendationCard = () => {
    return (
        <>
            {
                Array(6).fill(
                    <Box>
                        <Skeleton animation="wave" variant="rectangular" width={260} height={146} sx={{mr: 1, borderRadius: 2}} />
                        <Box>
                            <Skeleton animation="wave" height={10} width="90%" sx={{borderRadius: 1}}/>
                        </Box>
                    </Box>
                )
            }
        </>
    )
};

