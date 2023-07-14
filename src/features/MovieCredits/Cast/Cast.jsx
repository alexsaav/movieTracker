import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollTopWin } from '../../util/helperFunctions';
import LoadingList from '../../../components/Loading/LoadingList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material'



const Cast = ({ movieCast, isLoading, loadingItem }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    const totalCast = isLoading ?? <>({movieCast.length-1})</>;

    const toggleButton = () => {
        setShowMore(!showMore)
    };

    const items = movieCast.map(cast => {
        const { name, character, id, profile_path } = cast;
        return (
            <ListItem alignItems="flex-start" onClick={scrollTopWin} sx={{pl: 0}} key={id}>
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
   )});

    return (
        <Container>
            <Typography variant='h5'>Cast {totalCast}</Typography>
            <Box>
                {isLoading && <LoadingList items={40} />}
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                    {showMore ? items : items.slice(0, 20)}
                    <Button  onClick={toggleButton}>
                        {showMore ? "Show Less" : "...Show More"}
                    </Button>   
                </List>
            </Box> 
        </Container>
    )
};

export default Cast
