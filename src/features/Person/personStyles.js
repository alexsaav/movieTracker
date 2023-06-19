export const getModalStyleImages = (theme) => {
    return {
        container: {
            position: 'fixed',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            top: '0',
            left: '0',
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0,0,0,0.9)',
            boxShadow: 24,
            zIndex: 1,
            overflow: "scroll",
        },
        imagesContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px",
            height: "60%",
            [theme.breakpoints.down('xs')]: {
                padding: "1px",
            },
        },
        imagesInnerContainer: {
            display: "flex", 
            justifyContent: "center", 
            height: "100%",
            [theme.breakpoints.down('sm')]: {
                height: 'auto'
            },
        },
        image: {
            width: "100%", 
            height: "100%",
            [theme.breakpoints.down('sm')]: {
                //height: 'auto'
            },
        }, 
        closeButton: {
            position: "absolute",
            top: "50px",
            right: "35px",
            color: "#f1f1f1",
            fontSize: "40px",
            fontWeight: "bold",
            transition: "0.3s",
            textDecoration: "none",
            cursor: "pointer",
        },
        arrowButton: {
            color: "#f1f1f1",

        }
    }
};

export const getImagesStyle = (theme) => {
    return {
        container: {
            pt: "30px"
        },
        title: {
            cursor: "pointer", 
            fontSize: "2rem", 
            fontWeight: "bold", 
            pb: "10px", 
            "&:hover": {color: "#9F5BB0"}
        },
        subtitle: {
            fontSize: "1.5rem"
        },
        imagesContainer: {
            margin: "30px 0"
        },
        imagesInnerContainer: {
            overflowX: 'auto'
        },
        imageContainer: {
            cursor: "pointer",
            width: "100%", 
            height: "100%"
        },
        imageInnerContainer: {
            height: "100%", 
            width: "100%"
        }
    }
};