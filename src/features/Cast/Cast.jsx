import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';





const Cast = ({ movieCast }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant='h5'>Cast ({movieCast.length-1})</Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {movieCast.map(cast => {
                     const { name, character, id, profile_path } = cast;
                        return (
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemButton onClick={() => navigate(`/person/${id}/${name}`)}>
                                        <ListItemAvatar>
                                            <Avatar alt={name} src={`https://image.tmdb.org/t/p/original/${profile_path}`} />
                                        </ListItemAvatar>
                                        <ListItemText id={id} 
                                            primary={name}
                                            secondary={
                                                <React.Fragment>
                                                    {character}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        )
                    }
                )}
            </Grid> 
        </Container>
    )
}

export default Cast
