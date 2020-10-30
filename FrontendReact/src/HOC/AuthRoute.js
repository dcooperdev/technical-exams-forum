import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { isAuthUser, type } = props;
  /*if (type === "guest" && isAuthUser) return <Redirect to="/login" />;
  else */
  if (type === "user" && !isAuthUser) return <Redirect to="/login" />;
  else if (type === "admin" && !isAuthUser.rol === 'admin') return <Redirect to="/" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ user }) => ({
  isAuthUser: user.profile
});

export default connect(mapStateToProps)(AuthRoute);