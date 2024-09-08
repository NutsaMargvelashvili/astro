import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../constants';
import fbLogo from '../../images/fb-logo.png';
import googleLogo from '../../images/google-logo.png';
import styles from './RegisterModal.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class RegisterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registrationError: false
        };
    }

    handleSubmit = (event, errors, { username, email, password, confirmPassword }) => {
        const { handleRegister } = this.props;

        if (password !== confirmPassword) {
            this.setState({ registrationError: "Passwords do not match" });
            return;
        }

        handleRegister(username, email, password);
    };

    render() {
        const { registrationError } = this.state;
        const { handleClose, showModal } = this.props;

        return (
            <Modal isOpen={showModal} toggle={handleClose} >
                <AvForm onSubmit={this.handleSubmit}>
                    <ModalHeader id="register-title" toggle={handleClose}>
                        Sign up
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="12">
                                {registrationError && (
                                    <Alert color="danger">
                                        <strong>Registration failed!</strong> {registrationError}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="12">
                                <AvField
                                    name="username"
                                    label="Username"
                                    placeholder="Choose a username"
                                    required
                                    errorMessage="Username cannot be empty!"
                                    autoFocus
                                />
                                <AvField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Your email"
                                    required
                                    errorMessage="Invalid email!"
                                />
                                <AvField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Choose a password"
                                    required
                                    errorMessage="Password cannot be empty!"
                                />
                                <AvField
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Re-enter your password"
                                    required
                                    errorMessage="Please confirm your password!"
                                />
                            </Col>
                        </Row>
                        <div className="mt-1">&nbsp;</div>
                        <div className="login-container">
                            <SocialRegister />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleClose} tabIndex="1">
                            Cancel
                        </Button>{' '}
                        <Button color="primary" type="submit">
                            Sign up
                        </Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

class SocialRegister extends Component {
    render() {
        return (
            <div className="social-login">
                <Button block color="link" className={cx("google")} href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google
                </Button>
                <Button block color="link" className={cx("facebook")} href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> ( Not yet implemented )
                </Button>
            </div>
        );
    }
}

export default RegisterModal;
