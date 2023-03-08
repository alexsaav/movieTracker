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
import ReadMoreReadLess from "./ReadMoreReadLess";

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
        isLoading
    } = personDetails;

    const profilePhoto = `https://image.tmdb.org/t/p/original${profile_path}`;


    useEffect(() => {
        dispatch(getPersonDetailsAsync(id))
    }, [dispatch, id])


    return (
        <>
            <Box container sx={{display: "flex", flexWrap: "nowrap", alignItems: "center", background: 'rgba(0, 0, 0, 0.8)', padding: '0', height: "600px" }} >
                    {isLoading && <LoadingBox />} 
                    <Box sx={{p: "30px 40px", color: "#fff"}}>
                        <section style={{display: "flex", flexWrap: "noWrap"}}>
                            <Box sx={{
                                height: 450,
                                minWidth: 300,
                                display: 'flex',
                                borderRadius: '15px',
                                width: "35%",
                                overflow: "hidden"
                            }}>
                                <img src={profilePhoto} alt={name} style={{borderRadius: '15px'}} />
                            </Box>

                            <Box sx={{display: 'flex', color: '#F7F7F8'}}>
                                <section style={{display: 'flex', flexWrap: "wrap", alignContent: "center", paddingLeft: "40px"}}>
                                    <Box sx={{display: "flex", flexWrap: "wrap", width: "100%", mb: "24px"}}>
                                        <Typography variant='h1' sx={{fontSize: "2.2rem", fontWeight: 'bold',  width: "100%"}}>
                                            {name}
                                        </Typography>

                                        <Box sx={{width: "100%"}}>
                                            <Typography variant='h3' sx={{m: '10px 0', fontSize: "1.3em", fontWeight: 600, overflow: "hidden" }}>
                                                Biography
                                            </Typography>
                                            <Box sx={{paddingBottom: '5px'}}>
                                                <ReadMoreReadLess text={biography} limit={500} />
                                            
                                                {/* {biography ? <Typography paragraph={true}>{biography}</Typography> :
                                                            <Typography>There is no biography available.</Typography>
                                                } */}
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
                                </section>
                            </Box>
                            
                        </section>
                    </Box>
                
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
