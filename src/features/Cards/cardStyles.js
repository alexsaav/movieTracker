import { backdropClasses } from "@mui/material";

export const imageNotFound = {
    container: {
        textAlign: "center", 
        pt: "35px",
        height: '185px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        fontSize: 60
    }
}

export const cardStyle1 = {
    card: {
        width: 150, 
        minWidth: 150, 
        borderRadius: 3, 
        position: "relative", 
        background: "transparent", 
        boxShadow: "none",
        p: "0 5px"
    },
    cardContent: {
        display: "flex", 
        flexDirection: "column", 
        alignContent: "flex-start", 
        flexWrap: "wrap"
    },
    cardMedia: {
        borderRadius: "10px", 
        boxShadow: "0 2px 8px rgb(0 0 0 / 10%)", 
        width: "100%", 
        minHeight: 225,
        height: 225
    },
    avatar: {
        background: 'rgba(0, 0, 0, 0.5)', 
        position: "absolute", 
        top: "5px", 
        left: "10px"
    },
    votes: {
        fontWeight: "bold"
    },
    title: {
        mb: 1, 
        textDecoration: "none", 
        pb: 0, 
        overflowX: 'auto', 
        fontWeight: "bold", 
        fontSize: "1rem"
    },
    notFound: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center", 
        borderRadius: "10px", 
        boxShadow: "0 2px 8px rgb(0 0 0 / 10%)", 
        width: "100%", 
        minHeight: 225,
        height: 225
    }
};

export const cardStyle2 = {
    card: {
        width: 160, 
        height: "100%", 
        borderRadius: 2, 
        position: "relative", 
        display: "flex", 
        flexWrap: "wrap", 
        alignContent: "flex-start", 
        overflow: "hidden" 
    },
    cardMedia: {
        height: 225, 
        overflow: "hidden"
    },
    cardContent: {
        display: "flex", 
        flexDirection: "column", 
        alignContent: "flex-start", 
        flexWrap: "wrap"
    },
    avatar: {
        background: 'rgba(0, 0, 0, 0.5)', 
        position: "absolute", 
        top: "5px", 
        left: "10px"
    },
    votes: {
        fontWeight: "bold"
    },
    title: {
        mb: 0, 
        textDecoration: "none", 
        pb: 0, 
        overflowX: 'auto', 
        fontWeight: "bold", 
        fontSize: "1rem"
    },
    notFound: {
        textAlign: "center", 
        pt: "35px",
        height: '185px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export const searchResultCard = {
    card: {
        display: "flex", 
        mt: "10px", 
        width: "100%", 
        height: "150px"
    },
    cardActionArea: {
        display: "flex", 
        justifyContent: "flex-start", 
        alignItems: "flex-start"
    },
    cardContentImage: {
        minWidth: "94px", 
        width: "94px", 
        height: "100%",  
        p: 0, 
        borderRight: "1px solid #EAEBEB", 
        background: "#EAEBEB"
    },
    cardMedia: {
        height: "150px"
    },
    notFound: {
        textAlign: "center", 
        pt: "35px"
    },
    cardContentInfo: {
        display: "flex", 
        flexDirection: "column",  
        p: "10px 15px", 
        width: "950px"
    },
    title: {
        fontSize: "1rem", 
        fontWeight: "bold"
    },
    mediaType: {
        textTransform: 'capitalize'
    },
    knownFor: {
        fontSize: '1rem',
        pr: '10px',
    },
    overview: {
        mt: "10px"
    }
}