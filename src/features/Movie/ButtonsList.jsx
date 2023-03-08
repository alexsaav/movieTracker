import { List, ListItem, ListItemButton } from "@mui/material"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ButtonsList = ({averageVotes}) => {
  return (
    <List sx={{display: 'flex', alignItems: 'center', width: "100%", height: "68px" , mb: '20px'}}>
        <ListItem sx={{width: "10%"}}>
            {averageVotes}
        </ListItem>
        <ListItem sx={{width: "10%"}}>
            <ListItemButton aria-label="list">
                <FormatListBulletedIcon />
            </ListItemButton>
        </ListItem>
        <ListItem sx={{width: "10%"}}>
            <ListItemButton aria-label="favourite">
                <FavoriteBorderIcon />
            </ListItemButton>
        </ListItem>
        <ListItem sx={{width: "10%"}}>
            <ListItemButton aria-label="bookmark">
                <BookmarkBorderIcon />
            </ListItemButton>
        </ListItem>
    </List>
  )
}

export default ButtonsList