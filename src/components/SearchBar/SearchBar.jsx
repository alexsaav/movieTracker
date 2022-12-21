import { Box } from "@mui/material"
import { Input } from '@mui/material'

const SearchBar = ({searchInput, setSearchInput}) => {
    
    const searchMovies = (searchValue) => {
        setSearchInput(searchValue)
    }

    return (
        <>
            <Box sx={{mt: 5, border: "1px solid #1D1F20"}}>
                <Input 
                    margin="dense" 
                    color="secondary"
                    fullWidth="true" 
                    type="search" 
                    placeholder="Search"
                    name="search-input"
                    value={searchInput}
                    onChange={(e) => {searchMovies(e.target.value)}}
                    sx={{pl: 1, pr: 1}}
                    disableUnderline="true"
                />
            </Box>
        </>
    )
}

export default SearchBar