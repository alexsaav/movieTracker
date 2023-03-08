import { Button } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box'

const ReadMoreReadLess = ({text, limit}) => {
    const [isReadMoreShown, setIsReadMoreShown ] = useState(false);

    const toggleButton = () => {
        setIsReadMoreShown(prev => !prev)
    };

    return (
        <Box>
            {isReadMoreShown ? text : text.substr(0, limit)}
            <Button onClick={toggleButton}>
            {isReadMoreShown ? "Read Less" : "...Read More"}</Button>
        </Box>
    )
}

export default ReadMoreReadLess