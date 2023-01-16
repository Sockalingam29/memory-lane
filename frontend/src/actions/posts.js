import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import { toast } from 'react-toastify'

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
    alert(error.response.data.message)
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    toast("Post added successfully", {
      type: "success",
      position: "bottom-right",
      autoClose: 1000,
      theme: "dark"
    });

  } catch (error) {
    console.log(error)

    const errorMessage = error.response.data.message
    const errorDisplay = errorMessage ? errorMessage : error

    toast("Cannot add post! " + errorDisplay, {
      type: "error",
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark"
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
    alert(error.response.data.message)
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    toast("Post deleted successfully", {
      type: "success",
      position: "bottom-right",
      autoClose: 1000,
      theme: "dark"
    });

  } catch (error) {
    const errorMessage = error.response.data.message
    const errorDisplay = errorMessage ? errorMessage : error

    toast("Cannot delete post! " + errorDisplay, {
      type: "error",
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark"
    });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    toast("Post updated successfully", {
      type: "success",
      position: "bottom-right",
      autoClose: 1000,
      theme: "dark"
    });

  } catch (error) {
    console.log(error)

    const errorMessage = error.response.data.message
    const errorDisplay = errorMessage ? errorMessage : error

    toast("Cannot update post! " + errorDisplay, {
      type: "error",
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark"
    });
  }
};