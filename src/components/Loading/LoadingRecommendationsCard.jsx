import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { v4 as uuidv4 } from 'uuid';
import { loadingRecommendationCardStyles } from './loadingItems';

export const LoadingRecommendationCard = () => {
    return (
        <>
            {
                Array(6).fill().map(() =>
                    <Box key={uuidv4()}>
                        <Skeleton 
                            animation="wave" 
                            variant="rectangular" 
                            width={260} 
                            height={146} 
                            sx={loadingRecommendationCardStyles.firstItem} 
                        />
                        <Box>
                            <Skeleton 
                                animation="wave" 
                                height={10} 
                                width="90%" 
                                sx={loadingRecommendationCardStyles.secondItem}
                            />
                        </Box>
                    </Box>
                )
            }
        </>
    )
};

