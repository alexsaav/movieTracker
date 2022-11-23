import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const PaginationComponent = ({totalPages, setPage, page}) => {

    const handlePageChange = (page) => {
        setPage(page)
    }

    if(totalPages === 0) return null;
    
    return (
        <>
            <Stack spacing={2}>
                <Pagination 
                    page={page}
                    onChange={(e, pageNumber) => handlePageChange(pageNumber)}
                    count={totalPages} 
                    showFirstButton
                    showLastButton 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center'
                    }}     
                />
            </Stack>
        </>
    )
}

export default PaginationComponent