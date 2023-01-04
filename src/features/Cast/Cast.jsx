import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollTopWin } from '../util/helperFunctions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';





const Cast = ({ movieCast }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant='h5'>Cast ({movieCast.length-1})</Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                {movieCast.map(cast => {
                     const { name, character, id, profile_path } = cast;
                        return (
                            <ListItem alignItems="flex-start" onClick={scrollTopWin} sx={{pl: 0}}>
                                <ListItemButton onClick={() => navigate(`/person/${id}/${name}`)}>
                                    <ListItemAvatar>
                                        <Avatar 
                                            alt={name} 
                                            src={`https://image.tmdb.org/t/p/original/${profile_path}`} 
                                            sx={{ width: 56, height: 56}}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        id={id} 
                                        primary={name}
                                        secondary={
                                            <React.Fragment>
                                                {character}
                                            </React.Fragment>
                                        }
                                        sx={{pl: "25px"}}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                )}
                </List>
            </Grid> 
        </Container>
    )
}

export default Cast
