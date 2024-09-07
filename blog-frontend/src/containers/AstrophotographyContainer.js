import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as photoActions from "store/modules/photo";
import { withRouter } from 'react-router-dom';

class AstrophotographyContainer extends Component {

    getPhotoList = async () => {

        const { PhotoActions } = this.props;
        try {
            const response = await PhotoActions.getPhotoList(); // Log the fetched data
            console.log("Fetched Data:", response.data[0].fileUrl); // This will log the fetched datas
        } catch (e) {
            console.log("error log :" + e);
        }
    }

    componentDidMount() {
        console.log("123");

        this.getPhotoList();
    }

    render() {
        const { photos, loading, error } = this.props;

        if (loading)
            return null;

        return (
            <Fragment>
                {error && <h1>Server Error!</h1>}
                {!error &&
                    <div>
                        {photos?.size === 0 ? (
                            <p>No photos available</p>
                        ) : (
                            photos?.map(photo => (
                                <div key={photo?.get('id')}>
                                    <img src={photo?.get('fileUrl')} alt={photo?.get('fileName')} />
                                    <p>{photo?.get('fileName')}</p>
                                </div>
                            ))
                        )}
                    </div>
                }
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        photos: state.photo?.get("photos"),
        loading: state.pender.pending["photo/GET_PHOTO_LIST"],
        error: state.pender.failure["photo/GET_PHOTO_LIST"]
    }),
    dispatch => ({
        PhotoActions: bindActionCreators(photoActions, dispatch)
    })
)(withRouter(AstrophotographyContainer));
