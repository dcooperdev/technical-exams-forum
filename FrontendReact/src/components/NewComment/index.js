import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, TextField, Grid, Button  } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        marginTop: 12,
        marginBottom: 12,
    },
    textarea: {
        marginBottom: 12,
    }
});

export default ({user, postId, handleComment}) => {
    const classes = useStyles();

    const [comment, setCommentState] = useState({
        user,
        fullname: '',
        publication: '',
        comment: ''
    });

    const setComment = e => {
        setCommentState({
            fullname: user.complete_name,
            comment: e.target.value,
            publication: postId
        });
    }

    return (
        user && <Card variant="outlined" className={classes.root}>
            <CardContent>

                <TextField
                    id="body"
                    label={`Deja tu comentario ${user.complete_name}`}
                    name="body"
                    multiline
                    rows={4}
                    variant="outlined"
                    className={classes.textarea}
                    onChange={setComment}
                    fullWidth
                />
                <Grid container direction="row" justify="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleComment(comment)}>
                            Publicar Comentario
                    </Button>
                </Grid>

            </CardContent>

        </Card>
    );
}