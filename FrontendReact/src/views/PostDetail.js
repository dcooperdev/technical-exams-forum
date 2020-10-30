import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { updatePosts } from '../redux/posts/actions';
import { setLoading } from '../redux/common/actions';
import NewComment from '../components/NewComment';
import CommentsTree from '../components/CommentsTree';
import { Grid, Card, CardMedia, CardContent, Typography, Badge  } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { comment } from '../services/comment';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            post: null,
            user: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { posts } = this.props;
        const post = posts.find(post => post._id === id);
        this.setState({ id, post, user: this.props.user });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.post) {
            return true;
        }
        debugger
        if (this.props.posts !== nextProps.posts) {
            return true;
        }
        return false;
    }

    alreadyCommented = () => {
        const { post, user } = this.state;
        return post.comments.includes(comment => comment.user === user.username_email)
        // return false
    }

    handleComment = async (data) => {
        this.props.dispatchSetLoading(true);
        await comment(data, this.success, this.fail)
    }

    success = response => {
        this.props.dispatchUpdatePosts(response);
        this.props.dispatchSetLoading(false);
    }
    fail = response => {
        console.log({ response });
        this.props.dispatchSetLoading(false);
    }

    render() {
        const { id, post, user } = this.state;
        return (
            <Card>
                {post && <>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Typography gutterBottom variant="h4" component="h2">
                                {post.title}
                            </Typography>
                            <Badge 
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                badgeContent={post.likes.length || '0'} color="primary"
                            >
                                <FavoriteIcon color="secondary" fontSize="large" />
                            </Badge>
                        </Grid>

                        <Typography gutterBottom variant="h6" component="p">
                            By {post.owner}
                        </Typography>

                        <CardMedia
                            component="img"
                            alt={post.title}
                            image={post.image}
                            title={post.title}
                        />
                        
                        <Typography variant="h5" color="textSecondary" component="h3">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {(post?.owner  !== user?.username_email || !this.alreadyCommented) && <NewComment user={user} postId={id} handleComment={this.handleComment} />}
                        {post?.comments?.length > 0 && post.comments.map(comment => <CommentsTree key={comment._id} content={comment} user={user} />)}
                    </CardContent>
                </>}
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const posts = state.posts.list;
    const user = state.user.profile;
    return {
        posts,
        user
    }
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatchSetLoading: setLoading,
        dispatchUpdatePosts: updatePosts
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
