import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCombinedCredits, selectCombinedCredits } from '../personSlice'
import LoadingCardItem from '../../../components/Loading/LoadingCardItem'
import CardStyleOne from '../../Cards/CardStyleOne'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const KnownFor = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const combinedCredits = useSelector(selectCombinedCredits);
    const castJob = combinedCredits.cast.slice(0, 10);
    const isLoading = combinedCredits.isLoading;
    
    useEffect(() => {
        dispatch(getCombinedCredits(id))
    }, [dispatch, id])
    
    let filmsSorted = castJob.sort((a, b) => {
        const aVotes = a.vote_count;
        const bVotes = b.vote_count;
        if (!aVotes) return 1;
        if (!bVotes) return -1
    
        return bVotes - aVotes;  
    })
    
    return (
        <section sx={{padding: "30px 0", display: "block"}}>
            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Known For</Typography>

            <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row",  
                    width: "100%", 
                    p: "30px 0", 
                    overflowX: "scroll", 
                    overflowY: "hidden"
                }}
            >   
                {isLoading && <LoadingCardItem items={8} />}
                {filmsSorted.map(movie => {
                    return (
                        <CardStyleOne 
                            movie={movie} 
                            key={movie.id}
                        />
                    )
                })}
            </Box>
        </section>
    )
}

export default KnownFor