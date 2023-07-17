import { 
    Box, 
    Button, 
    Modal 
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { getModalStyle } from '../../styles/mediaStyles';

const ModalSlider = ({isMovie, handleClose, handleBackForwardButton, isOpen, currentIndex, children}) => {
    const theme = useTheme();
    const modalStyle = getModalStyle(theme); 

    const itemWrapperStyle = isMovie ? modalStyle.wideInnerContainer : modalStyle.itemInnerContainer;

    return (
        <Modal open={isOpen}>
            <Box style={modalStyle.container}>
                <Button onClick={handleClose} sx={modalStyle.closeButton}>
                    <CloseIcon />
                </Button>
                <Box sx={modalStyle.itemContainer}>
                    <Button onClick={() => handleBackForwardButton(currentIndex - 1)} sx={modalStyle.arrowButton}>
                        <ArrowBackIosIcon />
                    </Button>
                    <Box sx={itemWrapperStyle}>
                        {children}
                    </Box>
                    <Button onClick={() => handleBackForwardButton(currentIndex + 1)} sx={modalStyle.arrowButton}>
                        <ArrowForwardIosIcon />
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalSlider