import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from './SearchAppBar';
import ButtonMenuList from './ButtonMenuList/ButtonMenuList'
import NestedList from './NestedList';
import { 
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import menuItems from './menu'

const drawerWidth = 240;

const NavBar = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { window } = props;

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
                        <NestedList menuItem={menuItem} key={menuItem.title} handleDrawerToggle={handleDrawerToggle} />
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
                        onClick={() => navigate('/')}
                        sx={{display: { xs: 'none', sm: 'block' }, cursor: "pointer" }}
                    >
                        MovieTracker
                    </Typography>
                    <SearchAppBar />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                    ModalProps={{ keepMounted: true, // Better open performance on mobile. 
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