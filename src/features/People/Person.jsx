import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPersonDetailsAsync, selectPersonDetails } from "./personSlice"
import KnownFor from "./KnownFor";
import CombinedCredits from "./CombinedCredits";
import LoadingBox from "../../components/Loading/LoadingBox";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonTopImages from "./PersonTopImages";
import { Divider } from "@mui/material";
import ReadMore from "./ReadMore";

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
        profile_path,
        biography,
        isLoading,
    } = personDetails;

    const profilePhoto = `https://image.tmdb.org/t/p/original${profile_path}`;

    useEffect(() => {
        dispatch(getPersonDetailsAsync(id))
    }, [dispatch, id])


    return (
        <>
            <Box container sx={{background: "#1D1F20"}} >
                {isLoading ? (<LoadingBox />) : (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", width: "100%", minHeight: "500px", height: "100%", pt: "50px"}}>
                    <Box sx={{
                        height: 450,
                        minWidth: 300,
                        display: 'flex',
                        borderRadius: '15px',
                        overflow: "hidden",
                    }}>
                        <img src={profilePhoto} alt={name} style={{borderRadius: '15px'}} />
                    </Box>

                    <Box sx={{display: 'flex', flexWrap: "wrap", color: '#F7F7F8', maxWidth: "920px", p: "30px 40px"}}>        
                        <Box sx={{width: "100%"}}>
                            <Typography variant='h1' sx={{fontSize: "2.2rem", fontWeight: 'bold',  width: "100%"}}>
                                {name}
                            </Typography>
                        </Box>  
            
                        <Box sx={{width: "100%", mt: "30px"}}>
                            <Typography variant='h3' sx={{mb: "8px", fontSize: "1.3em", fontWeight: 600, overflow: "hidden" }}>
                                Biography
                            </Typography>
                            
                            <Box sx={{paddingBottom: '5px'}}>
                                {biography ? <ReadMore text={biography} limit={500}/> :
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
                        </Box>   
                    </Box>    
                </Box>
                )}
            </Box>

            <Box sx={{margin: '50px 50px'}}>
                <KnownFor />
                <Divider />
                <PersonTopImages personId={id} name={name} />
                <Divider />
                <CombinedCredits />
            </Box>
        </>
    )
}

export default Person
