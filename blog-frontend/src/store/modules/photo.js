// photo.js
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// Action Types
const GET_PHOTO_LIST = 'photo/GET_PHOTO_LIST';
const UPLOAD_PHOTO = 'photo/UPLOAD_PHOTO';

// Action Creators
export const getPhotoList = createAction(GET_PHOTO_LIST, api.getPhotos);
export const uploadPhoto = createAction(UPLOAD_PHOTO, api.uploadPhoto);



// Initial State
const initialState = Map({
    photos: List(), // State entry for photos
});

// Reducer
export default handleActions({
    ...pender({
        type: GET_PHOTO_LIST,
        onSuccess: (state, action) => {
            const { data: content } = action.payload;
            console.log("GET_PHOTO_LIST onSuccess");
            const photos = content === "" ? List() : fromJS(content);
            return state.set('photos', photos);
        },
        onFailure: (state, action) => {
            console.log("GET_PHOTO_LIST onFailure");
            return state;
        },
        onPending: (state, action) => {
            console.log("GET_PHOTO_LIST onPending");
            return state;
        }
    }),
    ...pender({
        type: UPLOAD_PHOTO,
        onSuccess: (state, action) => {
            const { data: content } = action.payload;
            console.log("UPLOAD_PHOTO onSuccess");
            // Assuming the response includes the new photo details
            return state.set('photos', state.get('photos').push(fromJS(content)));
        },
        onFailure: (state, action) => {
            console.log("UPLOAD_PHOTO onFailure");
            return state;
        }
    }),
}, initialState);

