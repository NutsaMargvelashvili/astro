import axios from 'axios';
// import { API_BASE_URL } from '../constants';
import { Storage } from 'lib/storage';

const API_BASE_URL = '';

export const getPost = (postId) => axios.get(`${API_BASE_URL}/api/posts/${postId}`);
export const getPosts = ({ page, size }) => axios.get(`${API_BASE_URL}/api/posts?page=${page}&size=${size}`);
export const writePost = (title, body) => axios.post(`${API_BASE_URL}/api/posts`, { title, body },
    {
        headers: {
            Authorization: getToken()
        }
    }
);
export const editPost = (id, title, body) => axios.put(`${API_BASE_URL}/api/posts/${id}`, { id, title, body },
    {
        headers: {
            Authorization: getToken()
        }
    }
);
export const deletePost = (id) => axios.delete(`${API_BASE_URL}/api/posts/${id}`,
    {
        headers: {
            Authorization: getToken()
        }
    });
export const login = (email, password) => axios.post(`${API_BASE_URL}/auth/authenticate`, { email, password });

// Register API call
export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getUser = () => axios.post(`${API_BASE_URL}/auth/user`, {},
    {
        headers: {
            Authorization: getToken()
        }
    });
export const getComments = (postId) => axios.get(`${API_BASE_URL}/api/comments/posts/${postId}`);

export const writeComment = (postId, body) => axios.post(`${API_BASE_URL}/api/comments/posts/${postId}`, { postId, body },
    {
        headers: {
            Authorization: getToken()
        }
    }
);

const getToken = () => {
    const token = Storage.local.get('__AUTH__') || Storage.session.get('__AUTH__');
    return `Bearer ${token}`;
};

export const uploadPhoto = (file) => {
    const formData = new FormData();
    if(file){
        formData.append('file', file);
    }

    return axios.post(`${API_BASE_URL}/api/photos/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: getToken()
        }
    });
};

export const getPhotos = () => axios.get(`${API_BASE_URL}/api/photos/feed`, {
    headers: {
        Authorization: getToken()
    }
});

// New function to fetch a photo by its ID
export const getPhotoById = (photoId) => axios.get(`${API_BASE_URL}/api/photos/${photoId}`, {
    headers: {
        Authorization: getToken()
    }
});
