const menuList = [
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Movies",
        items: [
            {
                name: "Popular",
                url: "/movies/popular",
            },
            {
                name: "Upcoming",
                url: "/movies/upcoming"
            },
            {
                name: "Top Rated",
                url: "/movies/top-rated"
            }
        ]
    },
    {
        title: "TV Series",
        items: [
            {
                name: "Popular",
                url: "",
            },
            {
                name: "Airing Today",
                url: ""
            },
            {
                name: "On TV",
                url: ""
            },
            {
                name: "Top Rated",
                url: ""
            }
        ]
    },
    {   
        title: "People",
        items: [
            {
                name: "Popular People",
                url: ""
            }
        ]
    },
    {
        title: "Login",
        url: "/user/login"
    },
    {
        title: "Register",
        url: "/user/register"
    }
];
export default menuList