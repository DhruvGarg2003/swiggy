import { configureStore } from "@reduxjs/toolkit";
import ToggleSlice from "./ToggleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";



const store = configureStore({
    reducer :{
        ToggleSlice : ToggleSlice,
        cartSlice : cartSlice,
        filterSlice : filterSlice,
        authSlice : authSlice
    }
})

export default store;