import axios from 'axios';

const url = 'https://memories-mrvk.onrender.com/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const updatePost = (id,post) => axios.put(`${url}/${id}/updatePost`,post);
