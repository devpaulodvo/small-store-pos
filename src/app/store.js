import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from '../slices/userDetailsSlice';

export default configureStore({
    reducer: {
        userdetails: userDetailsReducer, 
    },
});