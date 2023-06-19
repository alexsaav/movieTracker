import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuItemButton = ({menuItem}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {title, items} = menuItem;
    //let itemId = uuidv4();
    
    const handleClick = (event) => {
        if(menuItem.url) {
            navigate(menuItem.url)
            return
        }
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: '#fff' }}
            >
                {title}
            </Button>
            {items?.length > 0 &&
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {items.map(item => {
                        return (
                            <Link to={item.url} style={{color: "#fff", textDecoration: "none"}} key={item.name}>
                                <MenuItem onClick={handleClose}>{item.name}</MenuItem>
                            </Link>
                        )
                    })}
                </Menu>
            }
        </>
    )
}

export default MenuItemButton