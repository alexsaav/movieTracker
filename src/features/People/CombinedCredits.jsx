import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCombinedCredits, selectCombinedCredits } from './personSlice'
import CreditsListItem from './CreditsListItem'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import LoadingList from '../../components/Loading/LoadingList'

const CombinedCredits = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const combinedCredits = useSelector(selectCombinedCredits);
    const castJob = combinedCredits.cast;
    const crewJob = combinedCredits.crew;
    let departments = {};
    const isLoading = combinedCredits.isLoading;

    useEffect(() => {
        dispatch(getCombinedCredits(id))
    }, [dispatch, id])

    crewJob.forEach(crewJob => {
        let departmentGroup = crewJob.department;
        if(!departments[departmentGroup]) {
            departments[departmentGroup] = [];
        }

        departments[departmentGroup].push(crewJob);
   });

    return (
        <>
            <Box sx={{margin: '50px 50px'}}>
                <Typography variant="h2" sx={{fontSize: "2rem", fontWeight: "bold", pb: "30px"}}>Filmography</Typography>

                {isLoading && <LoadingList />}
                <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Acting</Typography>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', pt: "30px" }}>
                    {castJob.map(cast => {
                        return (
                            <CreditsListItem jobsList={cast}/>
                        )
                    })}
                </List>
         
                {Object.keys(departments).map(department => {
                    return (
                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>{department}</Typography>
                            {departments[department].map(crewJob => {

                                return (
                                    <CreditsListItem jobsList={crewJob}/>
                                )}
                            )}
                            <Divider/>
                        </List>                
                    )
                })}
            </Box>
        </>
    )
}

export default CombinedCredits
