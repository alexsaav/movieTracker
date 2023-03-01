import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCombinedCredits, selectCombinedCredits } from './personSlice'
import { scrollTopWin } from '../util/helperFunctions'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const CombinedCredits = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const combinedCredits = useSelector(selectCombinedCredits);
    const castJob = combinedCredits.cast;
    const crewJob = combinedCredits.crew;
    let departments = {};

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
                <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>Acting</Typography>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', pt: "30px" }}>
                    {castJob.map(cast => {
                        const { id, character, media_type, title, name, release_date, first_air_date, poster_path, backdrop_path, episode_count } = cast;
                        const date = new Date(release_date ?? first_air_date);

                        return (
                            <>
                                <ListItem alignItems="flex-start" sx={{pl: 0}} id={id}>
                                    <ListItemButton onClick={() => navigate(`/movie/${id}`)} sx={{flexGrow: 0}}>
                                        <ListItemAvatar>
                                            <Avatar 
                                                alt={title} 
                                                src={`https://image.tmdb.org/t/p/original/${poster_path}`} 
                                                sx={{ width: 56, height: 56}}
                                                onClick={scrollTopWin}
                                            />
                                        </ListItemAvatar>
                                    </ListItemButton>
                                    <Box sx={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                        <Box sx={{textTransform: "capitalize"}}>
                                            <Box onClick={() => navigate(`/movie/${id}`)}>
                                                <ListItemText 
                                                    primary={title ?? name}   
                                                    onClick={scrollTopWin}
                                                    sx={{fontWeight: "600", cursor: "pointer", fontSize: "1rem"}} 
                                                    disableTypography
                                                />
                                            </Box>
                                            <ListItemText secondary={character}/>
                                            <ListItemText secondary={media_type}/>
                                        </Box>
                                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                                            <ListItemText secondary={(release_date ?? first_air_date) ? <>{date.getFullYear()}</> : "-"} />
                                            {episode_count && <ListItemText secondary={`${episode_count} ${episode_count > 1 ? "episodes" : "episode"}`} />}
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </>
                        )
                    })}
                </List>
         
                {Object.keys(departments).map(department => {
                    return (
                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h2" sx={{fontSize: "1.5rem", fontWeight: "bold"}}>{department}</Typography>
                            {departments[department].map(crewJob => {
                                const { title, id, job, poster_path, backdrop_path, department, media_type, release_date, first_air_date, episode_count } = crewJob;
                                const date = new Date(release_date ?? first_air_date);

                                return (
                                    <>
                                        <ListItem alignItems="flex-start" sx={{pl: 0}}>
                                            <ListItemButton onClick={() => navigate(`/movie/${id}`)} sx={{flexGrow: 0}}>
                                                <ListItemAvatar>
                                                    <Avatar 
                                                        alt={title} 
                                                        src={`https://image.tmdb.org/t/p/original/${poster_path}`} 
                                                        sx={{ width: 56, height: 56}}
                                                    />
                                                </ListItemAvatar>
                                            </ListItemButton>
                                            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                                <Box sx={{textTransform: "capitalize"}}>
                                                    <ListItemText  
                                                        primary={title}   
                                                        onClick={() => navigate(`/movie/${id}`)}
                                                        sx={{fontWeight: "600", cursor: "pointer", fontSize: "1rem"}} 
                                                        disableTypography 
                                                    />
                                                    <ListItemText secondary={job}/>
                                                    <ListItemText secondary={media_type}/>
                                                </Box>
                                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                                                    <ListItemText secondary={(release_date ?? first_air_date) ? <>{date.getFullYear()}</> : "-"} />
                                                    {episode_count && <ListItemText secondary={`${episode_count} ${episode_count > 1 ? "episodes" : "episode"}`} />}
                                                </Box>
                                            </Box>
                                        </ListItem>
                                        <Divider />
                                    </>
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
