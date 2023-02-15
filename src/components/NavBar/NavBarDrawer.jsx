import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonMenuList from '../ButtonMenuList/ButtonMenuList';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const drawerWidth = 240;

const NavBarDrawer = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const handleClick = () => {
        setOpen(!open);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={handleDrawerToggle}>
                MovieTracker
            </Typography>
            <Divider />
            <List>
            {/* {menuItems.map(({title, items}) => {
                return (
                    <>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handleClick}>
                            <ListItemText primary={title} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {items.map(item => {
                                return (
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                )
                            })}
                        </List>
                    </Collapse>
                </>
                )
            })} */}
            </List>
        </Box>
    );

    return (
        <Box component="nav">
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default NavBarDrawer