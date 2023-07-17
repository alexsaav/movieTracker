import { 
    Box, 
    TextField, 
    IconButton 
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { getHomeSearchBarStyles } from "../../styles/styles";

const SearchBar = ({searchText, setSearchText, onSubmit}) => {
    
    const searchMovies = (searchValue) => {
        setSearchText(searchValue)
    }

    const styles = getHomeSearchBarStyles();

    return (
        <Box 
            component="form" 
            onSubmit={onSubmit}
            noValidate
            //autoComplete="off" 
            sx={styles.wrapper}
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
                sx={styles.field}
            />
            <IconButton type="button" sx={styles.icon} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default SearchBar