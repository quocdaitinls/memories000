import * as api from "../api";
import {
    CREATE,
    DELETE,
    UPDATE,
    FETCH_ALL,
    FETCH_POST,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
} from "./../constants/actionTypes";

// Actions Created
export const getPost = (id) => async (dispatch) => {
    console.log(id);
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);

        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
};

export const getPosts = (page) => async (dispatch) => {
    console.log(page);
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);

        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    console.log(searchQuery);
    try {
        dispatch({type: START_LOADING});
        const {
            data: {data},
        } = await api.fetchPostsBySearch(searchQuery);

        console.log(data);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post, history) => async (dispatch) => {
    console.log("Create post");
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);

        history.push(`/posts/${data._id}`);
        dispatch({type: CREATE, payload: data});
        // dispatch({type: END_LOADING});
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
