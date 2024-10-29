import { createSlice } from "@reduxjs/toolkit";

const getCartDataFromLocalStorage = () => {
    const data = localStorage.getItem("cartData");
    try {
        return JSON.parse(data) || []; // Safely parse and ensure it's an array
    } catch (e) {
        console.error("Error parsing cart data from localStorage:", e);
        return []; // Fallback to an empty array if parsing fails
    }
};

const getResInfoFromLocalStorage = () => {
    const data = localStorage.getItem("resInfo");
    try {
        return JSON.parse(data) || null; // Safely parse and ensure it's null if not present
    } catch (e) {
        console.error("Error parsing resInfo from localStorage:", e);
        return null; // Fallback to null if parsing fails
    }
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: getCartDataFromLocalStorage(), // Use function to get initial cart items
        resInfo: getResInfoFromLocalStorage(), // Use function to get initial restaurant info
    },
    reducers: {
        addToCart: (state, action) => {
            const { info, resInfo } = action.payload;
            // Avoid duplicates by checking if the item is already in the cart
            const itemExists = state.cartItems.some(item => item.id === info.id);
            if (!itemExists) {
                state.cartItems.push(info); // Add the item to the cart
                state.resInfo = resInfo; // Set the restaurant info in state
                localStorage.setItem("cartData", JSON.stringify(state.cartItems)); // Update cart data in localStorage
                localStorage.setItem("resInfo", JSON.stringify(resInfo)); // Update restaurant info in localStorage
            } else {
                console.warn("Item already exists in the cart:", info);
            }
        },
        deleteItem: (state, action) => {
            const { id } = action.payload; // Assuming action.payload contains an object with id
            const originalLength = state.cartItems.length;
            state.cartItems = state.cartItems.filter(item => item.id !== id); // Filter out the item
            if (state.cartItems.length < originalLength) {
                console.log(`Removed item with id: ${id}`);
                localStorage.setItem("cartData", JSON.stringify(state.cartItems)); // Update localStorage
            } else {
                console.warn("Item not found in cart:", id);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.resInfo = null; // Reset restaurant info
            localStorage.removeItem("cartData"); // Remove cart data from localStorage
            localStorage.removeItem("resInfo"); // Remove restaurant info from localStorage
        },
    },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
