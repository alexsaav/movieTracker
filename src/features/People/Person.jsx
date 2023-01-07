import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPersonDetailsAsync, selectPersonDetails } from "./personSlice"
import KnownFor from "./KnownFor";
import CombinedCredits from "./CombinedCredits";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import PersonTopImages from "./PersonTopImages";
import { Divider } from "@mui/material";


const Person = () =>  {
    const dispatch = useDispatch();
    const { id } = useParams();
    const personDetails = useSelector(selectPersonDetails);

    const {
        name,
        birthday,
        deathday,
        place_of_birth,    
        imdb_id,
        known_for_department,
        profile_path,
        biography
    } = personDetails;

    const profilePhoto = `https://image.tmdb.org/t/p/original${profile_path}`;


    useEffect(() => {
        dispatch(getPersonDetailsAsync(id))
    }, [dispatch, id])


    return (
        <>
            <Grid container rowSpacing={2} sx={{flexWrap: "nowrap", background: 'rgba(0, 0, 0, 0.8)', padding: "30px 0" }} >
                <Box sx={{
                        height: "400px",
                        display: 'flex',
                        borderRadius: '15px',
                        padding: "50px 60px"
                    }}>
                        <img src={profilePhoto} alt={name} style={{borderRadius: '15px'}} />
                </Box>
                <Grid sx={{display: 'flex', flexDirection: 'column', pr: '50px', pt: "50px", color: '#F7F7F8'}}>
                        <Typography variant="h1" sx={{fontSize: "2.5rem", fontWeight: "bold"}}>{name}</Typography>
                        <Box sx={{pr: "40px", pt: "30px", pb: "10px"}}>
                            <Typography sx={{fontWeight: "bold"}}>Biography</Typography>
                            {biography ? <Typography paragraph={true}>{biography}</Typography> :
                                         <Typography>There is no biography available.</Typography>
                            }
                        </Box>
                        <Box sx={{pb: "10px"}}>
                            <Typography sx={{fontWeight: "bold"}}>Born</Typography>
                            {birthday ? <Typography variant="body1">{birthday}</Typography> : "-"}
                        </Box>
                        <Box sx={{pb: "10px"}}>
                            <Typography sx={{fontWeight: "bold"}}>Place of Birth </Typography>
                            {place_of_birth ? <Typography variant="body1">{place_of_birth}</Typography> : "-"}
                        </Box>
                        {deathday  && 
                                <Box sx={{pb: "10px"}}>
                                    <Typography sx={{fontWeight: "bold"}}>Date of Death </Typography>
                                    <Typography variant="body1">{deathday}</Typography>
                                </Box>
                        }
                </Grid>
            </Grid>
            <Box sx={{margin: '50px 50px'}}>
                <PersonTopImages personId={id} name={name} />
                <Divider />
                <KnownFor personId={id} />
                <Divider />
                <CombinedCredits />
            </Box>
        </>
    )
}

export default Person
