import React from 'react'
import { useNavigate } from 'react-router-dom';
import { scrollTopWin } from '../util/helperFunctions'
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const CreditsListItem = ({jobsList, listItemStyle, listItemStyleInfo}) => {
    const navigate = useNavigate();
    const { 
        id,
        credit_id, 
        character, 
        media_type, 
        title, 
        name, 
        release_date, 
        first_air_date, 
        poster_path, 
        backdrop_path, 
        episode_count, 
        job 
    } = jobsList;
    const date = new Date(release_date ?? first_air_date);

    const onClick = media_type === 'movie' ? () => navigate(`/movie/${id}`) : () => navigate(`/page-not-found`)
    
    return (
        <>
            <ListItem alignItems="flex-start" sx={listItemStyle} key={id}>
                <ListItemButton onClick={onClick} sx={{flexGrow: 0}}>
                    <ListItemAvatar>
                        <Avatar 
                            alt={title} 
                            src={`https://image.tmdb.org/t/p/original/${poster_path ?? backdrop_path}`} 
                            sx={{ width: 56, height: 56}}
                            onClick={scrollTopWin}
                        />
                    </ListItemAvatar>
                </ListItemButton>
                <Box sx={listItemStyleInfo}>
                    <Box sx={{textTransform: "capitalize"}}>
                        <Box onClick={onClick}>
                            <ListItemText 
                                primary={title ?? name}   
                                onClick={scrollTopWin}
                                sx={{fontWeight: "600", cursor: "pointer", fontSize: "1rem"}} 
                                disableTypography
                            />
                        </Box>
                        <ListItemText secondary={character ?? job}/>
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
}

export default CreditsListItem