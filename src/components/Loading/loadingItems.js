export const loadingBoxStyles = {
    outerContainer: {
        display: "flex",
        justifyContent: "space-around", 
        alignItems: "center",
        p: "40px 30px",
        background: "#36393A"
    },
    innerContainer: {
        display: "flex", 
        flexDirection: "column", 
        p: "0px 10px", 
        width: "600px"
    },
    textContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        ml: 1, 
        mt: "7px"
    },
    pictureContainer: {
        display: "flex",
        width: "35%"
    },
    subtitle: {
        width: "100%",
        height: 20,
        mb: "10px"
    },
    text: {
        width: "100%",
        height: 70,
        mb: "10px"
    },
    title: {
        ml: 1, 
        mb: 2
    }
};

export const loadingCardItem = {
    container: {
        width: 150, 
        position: "relative"
    },
    firstItem: {
        mr: 1, 
        borderRadius: 2
    },
    secondItemInner: {
        borderRadius: 2
    }
};

export const loadingList = {
    container: {
        display: "flex", 
        flexDirection: "row", 
        mb: 2
    },
    innerBox: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        ml: 1
    },
    innerBoxItem: {
        marginBottom: 1
    }
};