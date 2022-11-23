import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Crew from '../Crew/Crew';




const Cast = ({ movieCast, topCast }) => {
   
    console.log(movieCast)

    if(topCast) {
        movieCast = movieCast.slice(0, 9)
    }

    return (
        <Container sx={{}}>
            <Typography variant='h5'>Cast ({movieCast.length-1})</Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {movieCast.map(cast => {
                    const { name, character, id, profile_path } = cast;
                    if(topCast) {
                        return (
                            <Card 
                                sx={{ 
                                    maxWidth: 140, 
                                    height: '100%', 
                                    paddingBottom: '3px', 
                                    margin: '5px' 
                                }} 
                                key={id} 
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/original/${profile_path}`}
                                        alt={name}
                                    />
                                    <CardContent sx={{padding: '5px 16px'}}>
                                        <Typography noWrap variant="h6" component="div" sx={{fontSize: '1em'}}>
                                            {name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {character}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    )} else {
                        return (
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemButton>
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
                                <Divider variant="inset" component="li" />
                            </List>
                        )
                    }
                })}
            </Grid> 
        </Container>
    )
}

export default Cast



/* 
<Card 
                        sx={{ 
                            maxWidth: 80, 
                            height: '100%', 
                            paddingBottom: '3px', 
                            margin: '5px' 
                        }} 
                        key={cast_id} 
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://image.tmdb.org/t/p/original/${profile_path}`}
                                alt={cast.name}
                            />
                            <CardContent sx={{padding: '5px 16px'}}>
                                <Typography noWrap variant="h6" component="div" sx={{fontSize: '1em'}}>
                                    {name} hello
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {character}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
*/