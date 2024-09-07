import React, { Fragment } from 'react';

import styles from './PhotoPreview.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const PhotoPreview = ({ photo }) => {
    if (photo === undefined) {
        return null;
    }

    let photoDescription = photo.get("description");
    if (photoDescription && photoDescription.length > 300) {
        photoDescription = photoDescription.substring(0, 300) + '...';
    }

    return (
        <Fragment>
            <div className={cx("photo-header")}>
                <h2 className={cx("photo-title")}>
                    <Link to={"/photos/" + photo.get("id")}>{photo.get("fileName")}</Link>
                </h2>
                <div className={cx("photo-meta")}>
                    Uploaded by {photo.get("uploadedBy")}
                    <span> {`  `} </span>
                    {moment(photo.get("uploadDate")).format("lll")}
                </div>
                <hr />
            </div>
            <div className={cx('photo-preview')}>
                <img src={photo.get('fileUrl')} alt={photo.get('fileName')} className={cx('photo-image')} />
            </div>
            {photoDescription && <div className={cx('photo-description')}>{photoDescription}</div>}
        </Fragment>
    );
};

export default PhotoPreview;
