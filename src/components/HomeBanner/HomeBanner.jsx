import SearchBar from "../SearchBar/SearchBar"
import { Box } from "@mui/material"
import { homeBannerStyle } from '../../styles/styles'


const HomeBanner = ({onSubmit, setSearchText}) => {
    return (
        <Box component='section' sx={homeBannerStyle}>
            <SearchBar onSubmit={onSubmit} setSearchText={setSearchText}/>
        </Box>
    )
}

export default HomeBanner