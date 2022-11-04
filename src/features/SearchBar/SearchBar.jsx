
const SearchBar = ({searchInput, setSearchInput}) => {
    
    const searchMovies = (searchValue) => {
        setSearchInput(searchValue)
    }

    return (
        <>
            <div>
                <div>
                    <input 
                        className='search-input'
                        placeholder='Search'
                        type="search" 
                        value={searchInput}
                        onChange={(e) => searchMovies(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar