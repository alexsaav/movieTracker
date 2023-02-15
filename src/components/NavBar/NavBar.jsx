import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonMenuList from '../ButtonMenuList/ButtonMenuList';
import NestedList from './NestedList';


const drawerWidth = 240;

const menuItems = [
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Movies",
        items: [
            {
                name: "Popular",
                url: "",
            },
            {
                name: "In Theatre",
                url: ""
            },
            {
                name: "Upcoming",
                url: ""
            },
            {
                name: "Top Rated",
                url: ""
            }
        ]
    },
    {
        title: "TV Series",
        items: [
            {
                name: "Popular",
                url: "",
            },
            {
                name: "Airing Today",
                url: ""
            },
            {
                name: "On TV",
                url: ""
            },
            {
                name: "Top Rated",
                url: ""
            }
        ]
    },
    {   
        title: "People",
        items: [
            {
                name: "Popular People",
                url: ""
            }
        ]
    }
];

const NavBar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={handleDrawerToggle}>
                MovieTracker
            </Typography>
            <Divider />
            <List sx={{display: "flex", flexDirection: "column"}}>
                {menuItems.map((menuItem) => {
                    return (
                        <NestedList menuItem={menuItem} />
                    )
                })}
            </List>
        </Box>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MovieTracker
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <ButtonMenuList menuItems={menuItems}/>
                    </Box>
                </Toolbar>
            </AppBar>

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
        </>
    )
}

export default NavBar