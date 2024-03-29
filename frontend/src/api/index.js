import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const API = axios.create({ baseURL: url })

//Called before calling other functions
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    return req
})

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, post) => API.put(`/posts/${id}/updatePost`, post);

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);
