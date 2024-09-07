import React, { Fragment } from 'react';

import styles from './PhotoList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const cx = classNames.bind(styles);

const PhotoList = ({ isAuthenticated, photos }) => {
    if (photos === undefined) {
        return null;
    }

    const photoList = photos.map((photo) => {
        console.log("here")
        let photoDescription = photo.get("description");
        let isReadMore = false;
        if (photoDescription && photoDescription.length > 200) {
            isReadMore = true;
        }

        return (
            <div key={photo.get("id")}>
                <div className={cx('photo')}>
                    <img src={photo.get('fileUrl')} alt={photo.get('fileName')} className={cx('photo-preview')} />
                    {isReadMore &&
                        <Button
                            className={'more-btn'}
                            color='primary'
                            size='sm'
                            tag={Link}
                            to={"/photos/" + photo.get("id")}>
                            Read More
                        </Button>}
                </div>
                <hr />
            </div>
        );
    });

    return (
        <Fragment>
            {isAuthenticated && <Button className={cx('upload-btn')} color='info' tag={Link} to={"/upload"}>UPLOAD PHOTO</Button>}
            <p className={"news_caption"}>Astrophotography Gallery</p>
            {photoList}
        </Fragment>
    );
};

export default PhotoList;
