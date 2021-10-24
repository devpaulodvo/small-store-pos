import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name:'userdetails',
    initialState:{
        fname: 'admin',
        lname: 'admin',
    },
    reducers:{
        fnameUpdater: (state, action)=>{
            state.fname = action.payload;
        },
        lnameUpdater: (state, action)=>{
            state.lname = action.payload;
        },
    }
});

export const {fnameUpdater, lnameUpdater} = slice.actions;

export const selectFname = state => state.userdetails.fname;
export const selectLname = state => state.userdetails.lname;

export default slice.reducer;