import { Button } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const styles = {
            text: {
                lineHeight: "1.25em",
                position: "relative",
            },
            "&:after": {
                content: '""',
                width: "55%",
                height: "1.25em",
                position: "absolute",
                right: 0,
                backgroundImage: "linear-gradient(to left, #1D1F20 50%, transparent 100%)"}

}

const ReadMore = ({ text, limit }) => {
    const [readMore,setReadMore] = useState(false);

    const toggleButton = () => {
        setReadMore(!readMore)
    };

    return (
        <Box 
            sx={{
                height: "100%", 
                position: "relative",
                top: 0,
                left: 0,
                overflow: "hidden",
                }}>
                
                <Typography paragraph={true} 
                    sx={styles}
                >
                    {readMore ? text : text.substr(0, limit)}
                </Typography>
                <Button 
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        bottom: "15px",
                        left: 0,
                        zIndex: 2,
                        height: "22px",
                        color: "#35A0B1"
                        }}
                    onClick={toggleButton}
                >
                    {readMore ? "Read Less" : "...Read More"}
                </Button>
            
        </Box>
    )
}

export default ReadMore