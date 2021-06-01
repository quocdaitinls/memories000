import React, {useState, useEffect} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {AppBar, Toolbar, Avatar, Typography, Button} from "@material-ui/core";
import decode from "jwt-decode";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyle from "./styles";
import {useDispatch} from "react-redux";

const Navbar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    const logout = () => {
        dispatch({type: "LOGOUT"});
        history.push("/auth");
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    // useEffect(() => {
    //     console.log(history);
    // });

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} height='45px' />
                <img
                    className={classes.image}
                    src={memoriesLogo}
                    alt='memories'
                    height='40'
                />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user.result.name}
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.logout}
                            color='secondary'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        color='primary'
                    >
                        SingIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
