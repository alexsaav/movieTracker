import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollTopWin } from '../../util/helperFunctions';
import LoadingList from '../../../components/Loading/LoadingList';
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
import { Skeleton } from '@mui/material';


const Crew = ({ movieCrew, isLoading, loadingItem }) => {
    const navigate = useNavigate();
    let departments = {};

    movieCrew.forEach(crewMember => {
        let departmentGroup = crewMember.department;
        if(!departments[departmentGroup]) {
            departments[departmentGroup] = [];
        }

        departments[departmentGroup].push(crewMember);
   });

   const totalCrew = isLoading ?? <>({movieCrew.length-1})</>;

    return (
        <Container>
            <Typography variant='h5'>
                Crew {totalCrew}
            </Typography>
            <Box>
                {isLoading && <LoadingList />}
                {Object.keys(departments).map(department => {
                    return (
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h6'>{department}</Typography>
                            {departments[department].map(crewMember => {
                                const { name, id, profile_path, credit_id, job, isLoading } = crewMember;
                                return (
                                    <ListItem alignItems="flex-start" key={credit_id} onClick={scrollTopWin} >
                                    {isLoading ? (loadingItem) : (
                                        <ListItemButton onClick={() => navigate(`/person/${id}/${name}`)} sx={{pl: 0}} key={id}>
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
                                )}
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
};

export default Crew;
