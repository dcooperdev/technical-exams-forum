import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLoading } from '../redux/common/actions';
import { setPosts } from '../redux/posts/actions';
import { fetchData } from '../services';
import { POSTS } from '../constants/routes';
import { Post } from '../components/Post';
import Grid from '@material-ui/core/Grid';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            error: null
        }
    }

    async componentDidMount() {
        this.props.dispatchSetLoading(true);
        await fetchData(POSTS, this.success, this.fail);
    }

    success = json => {
        this.setState({ posts: json })
        this.props.dispatchSetPosts(this.state.posts);
        this.props.dispatchSetLoading(false);
    }

    fail = error => {
        this.setState({ error })
        this.props.dispatchSetLoading(false);
    }

    render() {
        const { posts, profile } = this.props;
        return (
            <Grid container spacing={2}>
                {posts && posts.map(post => (
                    <Grid key={post._id} item xs={4}>
                        <Post post={post} actualUser={profile} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const posts = state.posts.list;
    const profile = state.user.profile;
    return {
        posts,
        profile
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatchSetLoading: setLoading,
        dispatchSetPosts: setPosts
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);