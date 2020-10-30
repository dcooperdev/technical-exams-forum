import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid  } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        marginBottom: 12,
    }
});

export default ({content, user}) => {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.root}>
            <CardContent>
                <Typography  variant="body2" component="h2">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <span>{content.fullname}</span>
                        <span>{content.createdDate}</span>
                    </Grid>
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {content.comment}
                </Typography>
            </CardContent>
        </Card>
    );
}