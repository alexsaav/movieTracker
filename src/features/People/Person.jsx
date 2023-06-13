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
import { getPersonComponentStyles, detailsComponentStyles } from "../styles/styles";
import { useTheme } from '@mui/material/styles';

const Person = () =>  {
    const dispatch = useDispatch();
    const { id } = useParams();
    const personDetails = useSelector(selectPersonDetails);

    const {
        name,
        birthday,
        deathday,
        place_of_birth,
        profile_path,
        biography,
        isLoading,
    } = personDetails;

    const profilePhoto = `https://image.tmdb.org/t/p/original${profile_path}`;

    useEffect(() => {
        dispatch(getPersonDetailsAsync(id))
    }, [dispatch, id])

    const theme = useTheme();
    const styles = getPersonComponentStyles(theme);

    return (
        <>
            {isLoading ? (<LoadingBox />) : (
                <Box sx={styles.container} >
                    <Box sx={detailsComponentStyles.imageContainer}>
                        <img src={profilePhoto} alt={name} style={detailsComponentStyles.image} />
                    </Box>

                    <Box sx={detailsComponentStyles.infoContainer}>        
                        <Box sx={{width: "100%"}}>
                            <Typography variant='h1' sx={detailsComponentStyles.title}>
                                {name}
                            </Typography>
                        </Box>  
            
                        <Box sx={styles.factsContainer}>
                            <Typography variant='h3' sx={styles.biographyHeader}>
                                Biography
                            </Typography>
                            
                            <Box sx={styles.biographyText}>
                                {biography ? <ReadMore text={biography} limit={500}/> :
                                    <Typography>There is no biography available.</Typography>
                                }
                            </Box>
                                            
                            <Box sx={styles.personalInfoContainer}>
                                <Typography sx={{fontWeight: "bold"}}>Born</Typography>
                                {birthday ? <Typography variant="body1">{birthday}</Typography> : "-"}
                            </Box>
                        
                            <Box sx={styles.personalInfoContainer}>
                                <Typography sx={{fontWeight: "bold"}}>Place of Birth </Typography>
                                {place_of_birth ? <Typography variant="body1">{place_of_birth}</Typography> : "-"}
                            </Box>
            
                            {deathday  && 
                                <Box sx={styles.personalInfoContainer}>
                                    <Typography sx={{fontWeight: "bold"}}>Date of Death </Typography>
                                    <Typography variant="body1">{deathday}</Typography>
                                </Box>
                            }
                        </Box>   
                    </Box>    
                </Box>
            )}

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
