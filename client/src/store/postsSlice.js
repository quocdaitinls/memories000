import {createSlice} from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: null,
    reducers: {},
});

const {reducer: postsReducer, actions} = postsSlice;
export default postsReducer;
