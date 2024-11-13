import { stepButtonClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const adminInfoString = localStorage.getItem('adminInfo');
const adminInfo = adminInfoString ? JSON.parse(adminInfoString) : null;



const updateLocalStorage = (state)=>{
    localStorage.setItem('adminInfo',JSON.stringify(state))
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminInfo : adminInfo,
        isAuthenticated : !!adminInfo,
        users: []
    },

    reducers: {
        addAdmin: (state, action) =>{
            state.adminInfo = action.payload;
            state.isAuthenticated = true;
            updateLocalStorage(state)
        },
        clearAdmin: (state) =>{
            state.adminInfo ={};
            state.isAuthenticated = false;
            state.users =[]
            updateLocalStorage(state)
        },
      
    },
});

export const {addAdmin,clearAdmin} =adminSlice.actions;
export const adminName = adminSlice.name;
export default adminSlice.reducer;