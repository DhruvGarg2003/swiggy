import { createSlice } from "@reduxjs/toolkit";



const ToggleSlice = createSlice({
    name : "ToggleSlice",
    initialState:{
        searchToggle: false ,
        loginToggle : false
    },
    reducers :{
        toggleSearchBar : (state , action)=>{
            state.searchToggle = !state.searchToggle;
        },
        toggleLogin: (state,action)=>{
            state.loginToggle = !state.loginToggle;
        }
    }
})

export const {toggleSearchBar,toggleLogin}=ToggleSlice.actions
export default ToggleSlice.reducer