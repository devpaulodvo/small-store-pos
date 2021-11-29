import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name:'userdetails',
    initialState:{
        auth: false,
        username: '',
        userid: 0,
    },
    reducers:{
        authUpdater: (state, action)=>{
            state.auth = action.payload;
        },
        usernameUpdater: (state, action)=>{
            state.username = action.payload;
        },
        userIdUpdater: (state, action)=>{
            state.userid = action.payload;
        },
    }
});

export const {authUpdater, usernameUpdater, userIdUpdater} = slice.actions;

export const selectAuth = state => state.userdetails.auth;
export const selectUsername = state => state.userdetails.username;
export const selectUserId = state => state.userdetails.userid;

export default slice.reducer;