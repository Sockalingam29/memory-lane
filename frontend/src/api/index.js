import axios from 'axios';

const url = 'http://localhost:5000/posts/';

export const fetchPosts = () => axios.get(url);

export const createPost = (post) =>{ 
    console.log(post);
    axios. post(url,post)
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
};

export const deletePost = (id) =>{
    axios.delete(url+id)
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
}

export const likePost = (id) =>{
    console.log("Axios");
    axios.patch(`${url}${id}/likePost`)
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
}