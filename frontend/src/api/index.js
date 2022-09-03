import axios from 'axios';

const url = 'https://memories-mern-appln.herokuapp.com/posts/';
// const url = 'https://localhost:5000/posts';
// reudx

export const fetchPosts = () => axios.get(url);

export const createPost = async(newPost) => await axios.post(url, newPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) =>{
    // console.log("Axios");
    axios.patch(`${url}${id}/likePost`)
    // .then(res => console.log(res.status))
    // .catch(err => console.log(err));
}