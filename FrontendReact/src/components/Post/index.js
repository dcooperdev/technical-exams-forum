import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Badge  } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    spacerBottom: {
        marginBottom: 15,
    },
    spacerLeft: {
        marginLeft: 15,
    }
}));

export const Post = ({post, actualUser}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <CardMedia
                    component="img"
                    alt={post.title}
                    height="140"
                    image={post.image}
                    title={post.title}
                    className={classes.spacerBottom}
                />
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <span>
                        <Badge 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            badgeContent={post.comments.length || '0'}
                            color="primary"
                        >
                            <CommentIcon color="secondary" fontSize="large" />
                        </Badge>
                        <Badge 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            badgeContent={post.likes.length || '0'}
                            color="primary"
                            className={classes.spacerLeft}
                        >
                            <FavoriteIcon color="secondary" fontSize="large" />
                        </Badge>
                    </span>
                </Grid>
                <Typography gutterBottom variant="h6" component="h3">
                    By: {post.owner}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Link to={"/post/"+post._id}>
                        <Button variant="contained" color="primary">
                            Ver
                        </Button>
                    </Link>
                    {actualUser?.username_email === post?.owner && <Button variant="contained" color="primary">
                        Editar
                    </Button>}
                    {actualUser?.rol === 'admin' && <Button variant="contained" color="secondary">
                        Borrar
                    </Button>}
                </Grid>
            </CardActions>
        </Card>
    );
}
