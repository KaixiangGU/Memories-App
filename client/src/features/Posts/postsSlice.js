import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    fetchAll(state, action) {
      return action.payload;
    },

    create(state, action) {
      return [...state, action.payload];
    },

    update(posts, action) {
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    },

    deleteReducer(state, action) {
      return state.filter((post) => post._id !== action.payload);
    },

    likePostReducer(posts, action) {
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    },
  },
});

//using middleware to fetch data
//middleware is executed before any reducers
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch(fetchAll(data));
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch(create(data));
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch(update(data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch(deleteReducer(id));
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch(likePostReducer(data));
  } catch (error) {
    console.log(error);
  }
};

export const { fetchAll, create, update, deleteReducer, likePostReducer } = postsSlice.actions;

export default postsSlice.reducer;
