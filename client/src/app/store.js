import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import authReducer from "../features/Auth/AuthSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
