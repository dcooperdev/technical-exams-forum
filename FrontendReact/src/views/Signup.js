import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLoading } from '../redux/common/actions';
import { setUser } from '../redux/user/actions';
import { signupUser } from '../services/signup';
import User from '../models/user';
import { INCOMPLETE_SIGNUP } from '../constants/errorMessages';
import { Card, CardContent, Typography, CardActions, TextField, Button  } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            error: null
        }
    }

    setName = e => this.setState({ name: e.target.value })
    setUsername = e => this.setState({ username: e.target.value })
    setPassword = e => this.setState({ password: e.target.value })

    check(){
        const { name, username, password } = this.state;
        return ( !name || !username || !password ) ? false : true
    }

    handleSignup = async () => {
        if (!this.check()) {
            this.setState({ error: INCOMPLETE_SIGNUP })
            return
        }
        await signupUser(this.state, this.success, this.fail)
    }

    success = response => {
        if(response) {
            const user = new User(response);
            sessionStorage.setItem('token', `Bearer ${response}`);
            this.props.dispatchSetUser({
                token: `Bearer ${user.token}`,
                profile: user.profile
            });
            this.props.dispatchSetLoading(false);
        }
    }
    fail = error => {
        this.setState({ error: error.message })
        this.props.dispatchSetLoading(false);
    }

    render() {
        const { error } = this.state;
        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Signup
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        onChange={this.setName}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="username"
                        label="Username"
                        onChange={this.setUsername}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.setPassword}
                        variant="outlined"
                        fullWidth
                    />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={this.handleSignup}>
                        Signup
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatchSetLoading: setLoading,
        dispatchSetUser: setUser
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);