import { Box } from "@mui/material"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = ({searchText, setSearchText, onSubmit}) => {
    
    const searchMovies = (searchValue) => {
        setSearchText(searchValue)
    }

    return (
        <>
            <Box 
                component="form" 
                onSubmit={onSubmit}
                noValidate
                //autoComplete="off" 
                sx={{mt: 5, display: "flex", justifyContent: "flex-end", alignItems: "center"}}
            >
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    placeholder="Search..."
                    name="query"
                    defaultValue={searchText}
                    onChange={(e) => {searchMovies(e.target.value)}}
                    sx={{pl: 1, pr: 1}}
                />
                <IconButton type="button" sx={{ p: '10px', mr: "20px", position: "absolute"}} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default SearchBar