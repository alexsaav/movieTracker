import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTopWin } from '../../util/helperFunctions'
import { 
    Box, 
    Typography 
} from '@mui/material'
import { viewMore } from './buttons'

const ViewMore = ({route, title}) => {
    return (
        <Box sx={viewMore.container}>
            <Link 
                to={route} 
                onClick={scrollTopWin} 
                style={viewMore.link}
            >
                <Typography variant="button">{title}</Typography>
            </Link>
        </Box>
    )
}

export default ViewMore