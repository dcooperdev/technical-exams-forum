import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from '../HOC/AuthRoute';
import Login from "../views/Login";
import PostDetail from "../views/PostDetail";
import NewPost from "../views/newPost";
import Posts from "../views/Posts";
import Signup from "../views/Signup";
import MasterView from "../middleware/MasterView";


const RouterApp = props => {
    return (
        <Switch>
            <AuthRoute exact path="/" type="guest">
                <MasterView>
                    <Posts />
                </MasterView>
            </AuthRoute>
            <AuthRoute exact path="/login" type="guest">
                <MasterView>
                    <Login />
                </MasterView>
            </AuthRoute>
            <AuthRoute exact path="/signup" type="guest">
                <MasterView>
                    <Signup />
                </MasterView>
            </AuthRoute>
            <AuthRoute exact path="/post/:id" type="guest" render={props => (
                <MasterView {...props}>
                    <PostDetail {...props} />
                </MasterView>
            )}/>
            <AuthRoute exact path="/new" type="user">
                <MasterView>
                    <NewPost />
                </MasterView>
            </AuthRoute>
            <Route component={Posts} />
        </Switch>
    )
}

export default RouterApp; 