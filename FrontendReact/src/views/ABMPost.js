import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { setLoading } from '../redux/common/actions';
import { addPosts } from '../redux/posts/actions';
import { getTextFieldData } from '../utils/util-querys';
import { Card, TextField, CardContent, Typography, Button  } from '@material-ui/core/';
import { createPosts } from '../services/posts';

class ABMPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            image: '',
            edit: false
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            const { id } = this.props.match.params;
            const { posts } = this.props;
            const post = posts.find(post => post._id === id);

            this.setState({
                title: post.title,
                body: post.body,
                image: post.image,
                edit: true
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            title: '',
            body: '',
            image: '',
            edit: false
        });
    }

    handleChange = (event) => {
        this.setState(getTextFieldData(event));
    };

    handleNewPost = async () => {
        this.props.dispatchSetLoading(true);
        await createPosts(this.state, this.success, this.fail);
    }

    handleUpdatePost = async () => {
        this.props.dispatchSetLoading(true);
        // await createPosts(this.state, this.success, this.fail);
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
        const { title, body, image, edit } = this.state;
        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {(!edit) ? 'New' : 'Edit'} post
                    </Typography>
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        defaultValue={title}
                        onChange={this.handleChange}
                        
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="image"
                        label="Image URL"
                        name="image"
                        defaultValue={image}
                        onChange={this.handleChange}
                        
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="body"
                        label="body"
                        name="body"
                        defaultValue={body}
                        onChange={this.handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                </CardContent>
                <CardContent>
                    {!edit && <Button variant="contained" color="primary" onClick={this.handleNewPost}>Create</Button>}
                    { edit && <Button variant="contained" color="primary" onClick={this.handleUpdatePost}>Update</Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ABMPost);