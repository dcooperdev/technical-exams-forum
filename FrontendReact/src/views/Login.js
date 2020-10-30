import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLoading } from '../redux/common/actions';
import { setUser } from '../redux/user/actions';
import { loginUser } from '../services/login';
import User from '../models/user';
import { INCOMPLETE_LOGIN } from '../constants/errorMessages';
import { Card, CardContent, Typography, CardActions, TextField, Button } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            redirect: false
        }
    }

    setEmail = e => this.setState({ email: e.target.value })
    setPassword = e => this.setState({ password: e.target.value })

    check(){
        const { email, password } = this.state;
        return ( !email || !password ) ? false : true
    }

    handleLogin = async () => {
        if (!this.check()) {
            this.setState({ error: INCOMPLETE_LOGIN })
            return
        }
        this.props.dispatchSetLoading(true);
        await loginUser(this.state, this.success, this.fail)
    }

    success = (response) => {
        if (response) {
            const user = new User(response);
            sessionStorage.setItem('token', `Bearer ${response}`);
            this.props.dispatchSetUser({
                token: `Bearer ${user.token}`,
                profile: user.profile
            });
            this.props.dispatchSetLoading(false);
        }
    }
    fail = (error) => {
        this.setState({ error: error.message })
        this.props.dispatchSetLoading(false);
    }

    render() {
        const { error } = this.state;
        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        id="username"
                        label="Username"
                        onChange={this.setEmail}
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
                    <Button variant="contained" color="primary" onClick={this.handleLogin}>
                        Login
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
