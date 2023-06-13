import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTopWin } from '../../features/util/helperFunctions'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

const ViewMore = ({route, title}) => {
    return (
        <Box sx={{pt: '20px'}}>
            <Link 
                to={route} 
                onClick={scrollTopWin} 
                style={{textDecoration: 'none', color: '#1D1F20'}}
            >
                <Typography variant="button">{title}</Typography>
            </Link>
        </Box>
    )
}

export default ViewMore