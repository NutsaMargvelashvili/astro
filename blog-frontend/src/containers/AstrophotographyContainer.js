import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as photoActions from "store/modules/photo";
import {Link, withRouter} from 'react-router-dom';
import {Button} from "reactstrap";

class AstrophotographyContainer extends Component {

    getPhotoList = async () => {

        const { PhotoActions } = this.props;
        try {
            const response = await PhotoActions.getPhotoList(); // Log the fetched data
            console.log("Fetched Data:", response.data); // This will log the fetched datas
        } catch (e) {
            console.log("error log :" + e);
        }
    }

    componentDidMount() {
        console.log("123");

        this.getPhotoList();
    }

    render() {
        const { photos, loading, error, isAuthenticated} = this.props;

        if (loading)
            return null;

        return (
            <Fragment>
                {error && <h1>Server Error!</h1>}
                {!error &&
                    <div className={"astrophotography-wrapper"}>
                        <div className={"astrophotography-caption"}>
                            <h1>Astrophotography</h1>
                            {isAuthenticated &&
                                <Button
                                    tag={Link}
                                    to={"/astrophotography/upload"}
                                    className={"astrophotography-upload-btn"}>
                                    Upload Your AstroMasterpiece
                                </Button>}
                        </div>
                        {photos?.size === 0 ? (
                            <p>No photos available</p>
                        ) : (
                            photos?.map(photo => (
                                <Button tag={Link}
                                        to={"/photo/" + photo.get("id")}>
                                    <div className={"astrophotography-image-wrapper"} key={photo?.get('id')}>
                                        <img className={"astrophotography-image"} src={photo?.get('fileUrl')}
                                             alt={photo?.get('fileName')}/>
                                        {/*<p>{photo?.get('fileName')}</p>*/}
                                    </div>
                                </Button>
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
        error: state.pender.failure["photo/GET_PHOTO_LIST"],
        isAuthenticated: state.auth.get("isAuthenticated")
    }),
    dispatch => ({
        PhotoActions: bindActionCreators(photoActions, dispatch)
    })
)(withRouter(AstrophotographyContainer));
