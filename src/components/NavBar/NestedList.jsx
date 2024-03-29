import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    List ,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NestedList = ({menuItem, handleDrawerToggle}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {items, title} = menuItem;

    const handleClick = () => {
        if(menuItem.url) {
            navigate(menuItem.url)
            return
        }
        setOpen(!open);
    };

    let icon;
    if (items?.length > 0){
        icon = open ? <ExpandLess /> : <ExpandMore />
    }

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={title} />
                    {icon}
                </ListItemButton>
            </ListItem>
     

            {items?.length > 0 &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {items.map(item => {
                            return (
                                <ListItemButton sx={{ pl: "32px", textAlign: 'left' }} key={item.name}>
                                    <ListItemText 
                                        primary={item.name} 
                                        onClick={() => {
                                            navigate(item.url)
                                            handleDrawerToggle()
                                        }} 
                                    />
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Collapse> 
            }
        </>
    );
}

export default NestedList