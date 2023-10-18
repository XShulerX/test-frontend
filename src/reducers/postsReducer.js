import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlicer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    removePosts: (state, action) => {
      state.posts.pop(action.payload);
    },
  },
});

export const { removePosts, addPosts } = postsSlicer.actions;
export default postsSlicer.reducer;
