import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: 12,
    },
    spacer: {
      marginLeft: 5,
    },
    user: {
      flexGrow: 1,
    },
}));


const Navbar = ({user, logout}) => {
    const classes = useStyles();
        
    return (
        <nav className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <AccountCircleIcon />
                        {user?.profile && <Typography className={classes.spacer} variant="h6" component="p">
                            Bienvenido {user?.profile?.complete_name}
                        </Typography>}
                    </IconButton>

                    <div className={classes.user}></div>

                    <Link to="/">
                        <Button variant="contained" color="primary" disableElevation>Publicaciones</Button>
                    </Link>
                    {user?.token && <Link to="/new">
                            <Button variant="contained" color="primary" disableElevation>Crear publicacion</Button>
                        </Link>
                    }
                    {!user?.token && <Link to="/login">
                            <Button variant="contained" color="primary" disableElevation>Login</Button>
                        </Link>
                    }
                    {!user?.token && <Link to="/signup">
                            <Button variant="contained" color="primary" disableElevation>Signup</Button>
                        </Link>
                    }
                    {user?.token && 
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </nav>
    );
}

export default Navbar;