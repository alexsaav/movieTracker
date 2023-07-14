export const getCreditsStyle = (theme) => {
    return {
        container: {
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap',
            },
        }
    }
}