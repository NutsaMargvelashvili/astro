import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom';
import * as authActions from "store/modules/auth";
import RegisterModal from '../components/Register/RegisterModal';
import {registerUser} from "../lib/api"; // Assuming you have a RegisterModal component

class RegisterContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({ showModal: this.props.showModal });
        }
    }

    handleRegister = async (username, password, email) => {
        try {
            const response = await registerUser({ username, password, email });
            if (response.status === 201) {
                console.log('User registered successfully!');
                this.setState({ showModal: false }); // Close modal after successful registration
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Registration failed: ', error.response.data);
            } else {
                console.error('An unexpected error occurred: ', error);
            }
        }
    };


    handleClose = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        const { location, isAuthenticated } = this.props;
        const { showModal } = this.state;
        const { from } = location.state || { from: { pathname: '/', search: location.search } };

        if (isAuthenticated) {
            return <Redirect to={from} />;
        }

        return (
            <RegisterModal
                showModal={!showModal}
                handleRegister={this.handleRegister}
                handleClose={this.handleClose}
                registerError={this.props.registerError}
            />
        );
    }
}

export default connect(
    state => ({
        loading: state.pender.pending["auth/REGISTER"],
        registerError: state.pender.failure["auth/REGISTER"],
        isAuthenticated: state.auth.get("isAuthenticated")
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(RegisterContainer);
