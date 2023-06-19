import MenuItemButton from './MenuItemButton';
import { v4 as uuidv4 } from 'uuid';

const ButtonMenuList = ({menuItems = []}) => {
    if(menuItems.length === 0) return;
    
    //let itemId = uuidv4();
    
    return (
        <>
            {menuItems.map((menuItem) => (
                <MenuItemButton menuItem={menuItem} key={menuItem.title} />
            ))}
        </>
    );
}

export default ButtonMenuList