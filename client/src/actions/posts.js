import * as api from "../api";
import {CREATE, DELETE, UPDATE, FETCH_ALL} from "./../constants/actionTypes";

// Actions Created
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    console.log("Create post");
    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    console.log("Update post");
    try {
        const {data} = await api.updatePost(id, post);
        // console.log("Data: ", data);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
};
