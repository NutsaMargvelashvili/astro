import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as photoActions from "store/modules/photo"; // Adjust path based on your project structure
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import {Link, withRouter} from 'react-router-dom';

class AstrophotographyUploadContainer extends Component {
    state = {
        file: null,
        error: null,
    };

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    }

    handleUpload = async (event) => {
        event.preventDefault();
        const { file } = this.state;
        const { PhotoActions } = this.props;

        if (!file) {
            this.setState({ error: "Please select a file to upload." });
            return;
        }

        try {
            await PhotoActions.uploadPhoto(file);
            // Optionally clear the file input and show a success message
            this.setState({ file: null, error: null });
        } catch (e) {
            this.setState({ error: "Failed to upload the photo. Please try again." });
        }
    }

    render() {
        const { loading, error, isAuthenticated } = this.props;
        const { file } = this.state;

        if (loading) return null;

        return (
            <Fragment>
                <div className={"astrophotography-upload-caption"}>
                    <h1>Upload Photo</h1>
                    <Button
                        tag={Link}
                        to={"/astrophotography"}>
                        Back
                    </Button>                </div>
                {!isAuthenticated && <p>You need to be logged in to upload photos.</p>}
                {isAuthenticated && (
                    <Form onSubmit={this.handleUpload} enctype="multipart/form-data">
                        <FormGroup>
                            <Label for="fileUpload">Select a photo to upload</Label>
                            <Input
                                type="file"
                                id="fileUpload"
                                onChange={this.handleFileChange}
                                accept="image/*"
                            />
                        </FormGroup>
                        <Button type="submit" color="primary" disabled={!file}>Upload</Button>
                        {error && <Alert color="danger" className="mt-2">{error}</Alert>}
                    </Form>
                )}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        loading: state.pender.pending["photo/UPLOAD_PHOTO"],
        error: state.pender.failure["photo/UPLOAD_PHOTO"],
        isAuthenticated: state.auth?.get("isAuthenticated"), // Adjust based on your auth state structure
    }),
    dispatch => ({
        PhotoActions: bindActionCreators(photoActions, dispatch),
    })
)(withRouter(AstrophotographyUploadContainer));
