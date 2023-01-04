import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { scrollTopWin } from '../util/helperFunctions';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';


const Crew = ({movieCrew}) => {
    const navigate = useNavigate();
    let departments = {};

    movieCrew.forEach(crewMember => {
        let departmentGroup = crewMember.department;
        if(!departments[departmentGroup]) {
            departments[departmentGroup] = [];
        }

        departments[departmentGroup].push(crewMember);
   });

    return (
        <Container>
            <Typography variant='h5'>Crew ({movieCrew.length-1})</Typography>
            <Box>
                {Object.keys(departments).map(department => {
                    return (
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h6'>{department}</Typography>
                            {departments[department].map(crewMember => {
                                const { name, id, profile_path, credit_id, job } = crewMember;
                                return (
                                    <ListItem alignItems="flex-start" credit_id={credit_id} onClick={scrollTopWin} >
                                        <ListItemButton onClick={() => navigate(`/person/${id}/${name}`)} sx={{pl: 0}}>
                                            <ListItemAvatar>
                                                <Avatar 
                                                    alt={name} 
                                                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                                                    sx={{ width: 56, height: 56}}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={id} 
                                                primary={name}
                                                secondary={
                                                    <React.Fragment>
                                                        {job}
                                                    </React.Fragment>
                                                }
                                                sx={{pl: "25px"}}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            )}
                            <Divider/>
                        </List>                
                    )
                })}
            </Box>
        </Container>
    )
}

export default Crew;
