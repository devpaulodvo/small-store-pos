import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from '../slices/userDetailsSlice';
import cartDetailsReducer from '../slices/cartDetailsSlice';

export default configureStore({
    reducer: {
        userdetails: userDetailsReducer,
        cartdetails: cartDetailsReducer,
    },
});