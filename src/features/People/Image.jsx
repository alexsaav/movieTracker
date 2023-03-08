import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Image = ({imageUrl}) => {
    return (
        <Box sx={{p: "0 5px", maxWidth: "400px"}} key={imageUrl}>
            <Card sx={{width: "300px", height: "300px"}}>
                <CardMedia 
                    component="img"
                    image={imageUrl}
                    sx={{height: "100%",  width: "100%"}}
                />
            </Card>
        </Box>
    )
}

export default Image