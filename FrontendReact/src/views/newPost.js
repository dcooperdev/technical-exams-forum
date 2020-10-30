import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { setLoading } from '../redux/common/actions';
import { addPosts } from '../redux/posts/actions';
import { getTextFieldData } from '../utils/util-querys';
import { Card, TextField, CardContent, Typography, Button  } from '@material-ui/core/';
import { createPosts } from '../services/posts';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            image: ''
        }
    }

    handleChange = (event) => {
        this.setState(getTextFieldData(event));
    };

    handleNewPost = async () => {
        this.props.dispatchSetLoading(true);
        await createPosts(this.state, this.success, this.fail);
    }

    success = (response) => {
        if (response) {
            this.props.dispatchAddPost(response);
            this.props.dispatchSetLoading(false);
        }
    }
    fail = (error) => {
        this.props.dispatchSetLoading(false);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        New post
                    </Typography>
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="image"
                        label="Image URL"
                        name="image"
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="body"
                        label="body"
                        name="body"
                        onChange={this.handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                </CardContent>
                <CardContent>
                    <Button variant="contained" color="primary" onClick={this.handleNewPost}>Create</Button>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const posts = state.posts.list;
    return {
        posts
    }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatchAddPost: addPosts,
        dispatchSetLoading: setLoading,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);