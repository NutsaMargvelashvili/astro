import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as photoActions from "store/modules/photo"; // Adjust this path based on your project structure
import Photo from "components/Photo"; // Assume you have a Photo component to display a single photo
import { withRouter } from 'react-router-dom';

class AstrophotographyPhotoContainer extends Component {

    getPhoto = async (id) => {
        const { PhotoActions } = this.props;
        try {
            await PhotoActions.getPhotoById(id); // Assuming this action returns a Promise
            console.log("Fetched photo data:", this.props.photo); // Log the data from the state
        } catch (e) {
            console.log("Error log:", e);
        }
    }

    componentDidMount() {
        const { id } = this.props;
        this.getPhoto(id);
    }

    render() {
        const { photo, loading, error } = this.props;

        if (loading)
            return <div>Loading...</div>;

        return (
            <Fragment>
                {error && <h1>Server Error!</h1>}
                {!error && photo &&
                    <Photo photo={photo} />}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        photo: state.photo.get("selectedPhoto"), // Adjust based on your store structure
        loading: state.pender.pending["photo/GET_PHOTO_BY_ID"], // Adjust the action type if necessary
        error: state.pender.failure["photo/GET_PHOTO_BY_ID"], // Adjust the action type if necessary
    }),
    dispatch => ({
        PhotoActions: bindActionCreators(photoActions, dispatch)
    })
)(withRouter(AstrophotographyPhotoContainer));
