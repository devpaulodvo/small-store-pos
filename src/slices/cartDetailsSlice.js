import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cartdetails',
    initialState:{
        orders: [],
        total: 0,
        userid: {},
    },
    reducers:{
        orderUpdater: (state, action)=>{
            state.orders[state.orders.length] = action.payload;
        },
        useridUpdater: (state, action)=>{
            state.userid = action.payload;
        },
        deleteOrder:(state, action)=>{
            try{
                state.orders = state.orders.filter( item => item.index !== action.payload);
            }catch(e){
                console.log(e)
            }
        },
        totalCal: (state, action)=>{
            state.total = state.total + action.payload;
        },
    }
});

export const {orderUpdater, useridUpdater, deleteOrder, totalCal} = cartSlice.actions;

export const selectOrders = state => state.cartdetails.orders;
export const selectUserId = state => state.cartdetails.userid;


export default cartSlice.reducer;




