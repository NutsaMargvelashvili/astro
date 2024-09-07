import classNames from 'classnames/bind';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Photo.scss';

const cx = classNames.bind(styles);

const Photo = ({ photo }) => {
    if (photo === undefined) {
        return null;
    }

    console.log("Nutsaaaaaaa")
    return (
        <Fragment>
            <div className={cx("photo-wrapper")}>
                <div className={cx("photo-header")}>
                    <h2 className={cx("photo-title")}>
                        <Link to={"/photos/" + photo.get("id")}>{photo.get("fileName")}</Link>
                    </h2>

                    <div className={cx("photo-meta")}>
                        Uploaded by {photo.get("uploadedBy")}
                        <span> {`  `} </span>
                        {moment(photo.get("lastModifiedDate")).format("lll")}
                    </div>

                    <hr />
                </div>
                <div className={cx('photo-body')}>
                    <img src={photo.get("fileUrl")} alt={photo.get("fileName")} className={cx('photo-img')} />
                </div>
            </div>
        </Fragment>
    );
};

export default Photo;
