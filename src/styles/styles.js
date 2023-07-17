import bgHome from '../assets/images/background-2.jpg'

//CONTAINERS
export const topMediaContainersStyles = {
    wrapper: {
        padding: "30px"
    },
    innerContainer: {
        display: "flex", 
        flexDirection: "row",  
        width: "100%", 
        p: "30px 0", 
        overflowX: "scroll", 
        overflowY: "hidden"        
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: 'bold'
    }, 
    sectionStyle: {
        padding: '40px 0px'
    }
};

//HOME BANNER
export const homeBannerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "flex-end",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${bgHome})`,
    height: 350,

    '&:after': {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: '""',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
}

export const getHomeSearchBarStyles = () => {
    return {
        wrapper: {
            mt: 5, 
            display: "flex", 
            justifyContent: "flex-end", 
            alignItems: "center", 
            p: 2, 
            zIndex: 1
        },
        field: {
            backgroundColor: '#ffffff', 
            borderRadius: 2
        },
        icon: { 
            p: '10px', 
            mr: "20px", 
            position: "absolute"
        }
    }
}

//SECTIONS WRAPPER 

export const sectionsWrapper = {
    padding: '30px'
}

//DETAILS FOR MOVIE AND PERSON PROFILE

export const detailsComponentStyles = {
    imageContainer: {
        height: 450,
        minWidth: 300,
        display: 'flex',
        borderRadius: '15px',
        overflow: "hidden"
    },
    image: {
        borderRadius: "15px"
    },
    infoContainer: {
        display: 'flex', 
        flexWrap: "wrap", 
        color: '#F7F7F8', 
        maxWidth: "920px", 
        p: "30px 40px"
    },
    header: {
        display: "flex", 
        flexWrap: "wrap", 
        width: "100%", 
        mb: "24px"
    },
    title: {
        fontSize: "2.2rem", 
        fontWeight: 'bold',  
        width: "100%"
    },
};

//MOVIE COMPONENT

export const getMovieComponentStyles = (theme) => {
    return {
        container: {
            [theme.breakpoints.down('sm')]: {
                display: "flex", 
                flexWrap: "wrap",
            },
            display: "flex", 
            justifyContent: "center",
            alignItems: "center", 
            background: 'rgba(0, 0, 0, 0.8)', 
            p: "40px 50px", 
            minHeight: "500px",
            height: "100%",
        },
        releaseDate: {
            fontSize: "2.2rem", 
            opacity: 0.8, 
            pl: 1
        },
        factsContainer: {
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "flex-start", 
            alignItems: "center", 
            paddingBottom: '5px'
        },
        runtime: {
            padding: "0 4px"
        },
        divider: {
            borderColor: '#F7F7F8', 
            padding: "0 2px"
        },
        headerInfo: {
            width: "100%"
        }, 
        tagline: {
            opacity: 0.7, 
            color: '#B7BBBD'
        },
        overviewTitle: {
            m: '10px 0', 
            fontSize: "1.3em", 
            fontWeight: 600, 
            overflow: "hidden"
        },
        overviewText: {
            paddingBottom: '5px'
        }
    };    
}

//PERSON COMPONENT

export const getPersonComponentStyles = (theme) => {
    return {
        container: {
            [theme.breakpoints.down('sm')]: {
                display: "flex", 
                flexWrap: "wrap",
            },
            display: "flex", 
            justifyContent: "center",
            //flexWrap: "wrap", 
            alignItems: "flex-start", 
            background: 'rgba(0, 0, 0, 0.8)', 
            p: "40px 50px", 
            minHeight: "500px",
            height: "100%",
            backgroundColor: "#191F20"
        },
        factsContainer: {
            width: "100%", 
            mt: "30px"
        },
        biographyHeader: {
            mb: "8px", 
            fontSize: "1.3em", 
            fontWeight: 600, 
            overflow: "hidden"
        },
        biographyText: {
            paddingBottom: '5px'
        },
        personalInfoContainer: {
            pb: "10px"
        }
    }
};


export const getFilmographyStyles = (theme) => {
    return {
        container: {
            margin: "50px"
        },
        listItem: {
            [theme.breakpoints.down('sm')]: {
                display: "flex", 
                flexWrap: "wrap",
            },
            pl: 0
        },
        listItemInfo: {
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", alignItems: "center", 
            pl: "10px",
            [theme.breakpoints.down('sm')]: {
                flexWrap: "wrap",
            }
        }
    }
};


//HEADER

export const getMovieHeaderStyles = (theme) => {
    return {
        container: {
            height: 87, 
            background: 'rgba(0, 0, 0, 0.7)', 
            padding: "15px 40px", 
            display: "flex",
            width: 'inherit',
        },
        poster: {
            borderRadius: 10, 
            height: 87, 
            width: 58, 
            minWidth: 58, 
            padding: 6        
        },
        titleContainer: {
            color: "#F7F7F8", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", 
            alignContent: "center",
            paddingLeft: "20px"        
        },
        titleInnerContainer: {
            display: "flex", 
            alignContent: "center", 
            alignItems: "center", 
            mb: 0        
        },
        title: {
            color: "#F7F7F8", 
            fontSize: "2.2rem", 
            fontWeight: 600,            
            [theme.breakpoints.down('sm')]: {
                fontSize: "1.2rem"
            }, 
        },
        date: {
            fontSize: "1.1em", 
            fontWeight: 400, 
            margin: "0 10px", 
            opacity: 0.6,
            [theme.breakpoints.down('sm')]: {
                fontSize: "1rem"
            },      
        },
        button: {
            textDecoration: "none", 
            color: "#F7F7F8", 
            opacity: 0.6, 
            fontSize: "1.1em", 
            display: "flex", 
            margin: 0,
            [theme.breakpoints.down('sm')]: {
                fontSize: "1rem"
            }, 
        },
        buttonText: {
            fontSize: "1.1em", 
            fontWeight: 600
        }
    }    
};

//RECOMMENDATIONS

export const recommendationsStyles = {
    card: {
        width: 260, 
        minHeight: 146, 
        maxHeight: 146, 
        borderRadius: 3, 
        position: "relative", 
        background: "#EAEBEB"
    },
    imageContainer: {
        padding: "0 7px", 
        background: 'rgba(0, 0, 0, 0.5)',
        position: "absolute",
        color: "#F7F7F8",
        textDecoration: "none",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 1        
    },
    title: {
        mb: 0, 
        textDecoration: "none", 
        paddingBottom: 0
    }
};

export const topImagesStyles = {
    imageContainer: {
        p: "0 5px", 
        maxWidth: "400px"
    },
    image: {
        width: "450px", 
        height: "250px"
    }
};

//TOP VIDEOS 

export const topVideosStyles = {
    videoLink: {
        textDecoration: 'none', 
        color: '#1D1F20'
    },
    videoContainer: {
        p: "0 5px", 
        width: "400px"
    },
    card: {
        minWidth: "360px", 
        maxWidth: "400px",  
        height: "250px", 
        position: "relative"
    },
    playButtonContainer: {
        padding: "0 7px", 
        background: 'rgba(0, 0, 0, 0.5)',
        position: "absolute",
        color: "primary",
        textDecoration: "none",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 1        
    },
    playButtonIcon: {
        height: 38, 
        width: 38, 
        color: "#F7F7F8"
    }
};


