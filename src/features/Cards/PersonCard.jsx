import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { CardMedia } from '@mui/material';
import { scrollTopWin } from '../util/helperFunctions';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


const PersonCard = ({ results }) => {
    const navigate = useNavigate();
    const { id, character, name, profile_path } = results;

    let image;
                    if (profile_path) {
                        const photorUrl = `https://image.tmdb.org/t/p/original/${profile_path}`;
                        image = <CardMedia
                                    component="img"
                                    height="140"
                                    image={photorUrl}
                                    alt={name}
                                /> 
                    } else {
                        image = <Box sx={{textAlign: "center"}}>
                                    <PersonIcon color="disabled" sx={{fontSize: 60, height:"140px"}}/>
                                </Box> 
                    }

    return (
        <Card 
                            sx={{ 
                                maxWidth: 130, 
                                minWidth: 130, 
                                paddingBottom: '3px', 
                                margin: '5px' 
                            }} 
                            key={id} 
                            onClick={scrollTopWin}
                        >        
                            <CardActionArea onClick={() => navigate(`/person/${id}/${name}`)}>
                                {image}
                                <CardContent sx={{padding: '5px 16px', bottom: 0}}>
                                    <Typography 
                                        noWrap 
                                        variant="h6" 
                                        component="div" 
                                        sx={{fontSize: "0.8rem"}} 
                                        onClick={() => navigate(`person/${id}-${name}`)}
                                    >
                                        {name}
                                    </Typography>
                                    {character &&
                                        <Typography variant="body2" color="text.secondary">
                                            {character}
                                        </Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>
    )
}

export default PersonCard