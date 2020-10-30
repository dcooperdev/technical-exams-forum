import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { removeUser } from '../redux/user/actions';
import Navbar from '../components/Navbar';

class MasterView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    logout = async () => {
        this.props.dispatchLogout();
    }

    render(){
        const { user } = this.props
        return (
            <>
                <Navbar user={user} logout={this.logout} />
                {this.props.children}
            </>
        )
    }

}

const mapStateToProps = state => {
    const { user } = state;
    return {
        user
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            dispatchLogout: removeUser,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MasterView);