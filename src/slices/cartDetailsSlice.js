import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cartdetails',
    initialState:{
        orders: {},
        userid: null,
    },
    reducers:{
        orderUpdater: (state, action)=>{
            state.orders = {...action.payload};
        },
        useridUpdater: (state, action)=>{
            state.userid = action.payload;
        }
    }
});

export const {orderUpdater, useridUpdater} = cartSlice.actions;

export const selectOrders = state => state.cartdetails.orders;
export const selectUserId = state => state.cartdetails.userid;


export default cartSlice.reducer;




