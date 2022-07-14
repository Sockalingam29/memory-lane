import axios from 'axios';

const url = 'http://localhost:5000/posts/';

export const fetchPosts = () => axios.get(url);

export const createPost = (post) =>{ 
    axios. post(url,post)
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
};
