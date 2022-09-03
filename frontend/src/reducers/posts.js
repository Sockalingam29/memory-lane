import { FETCH_ALL, CREATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) => (post._id === action.payload.updatedPost._id ? action.payload.updatedPost : post));
    case CREATE:
      return [...posts, action.payload.newPost];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};