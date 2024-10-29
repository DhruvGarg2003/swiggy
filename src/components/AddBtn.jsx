import React, { useState } from 'react'
import { addToCart } from '../Utils/cartSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function AddBtn({info,resInfo}) {
    const cartData = useSelector((state)=> state.cartSlice.cartItems)
    const [isDiffRes,setIsDiffRes] = useState(false);
    const getResInfo =  useSelector((state)=> state.cartSlice.resInfo)
        const dispatch = useDispatch();
    function handleAddcart() {
        const isAdded = cartData.find((data) => data.id === info.id);
        function handleIsDiff(){
            setIsDiffRes(!isDiffRes);
        }
        // Check if resInfo exists in Redux store (getResInfo)
        if (!isAdded) {
            // If no restaurant info is present, set it with the current restaurant info
            if (!getResInfo) {
                dispatch(addToCart({ info, resInfo })); // Adds the first item and sets resInfo
            } else if (getResInfo?.name.trim().toLowerCase() === resInfo?.name.trim().toLowerCase()) {
                dispatch(addToCart({ info, resInfo })); // Same restaurant, add item
                toast.success("food added to the cart")
            } else {
                // alert("You can't add items from a different restaurant.");
                handleIsDiff();
                toast.error("different Resturant")
            }
        } else {
            toast.error("already added");
            // alert("Item already added to the cart.");
        }
    }
  return (
    <div>
       <button onClick={handleAddcart} className='bg-white text-lg font-bold text-green-700  border px-10 py-2 drop-shadow rounded-xl absolute bottom-[-20px] left-5'>Add</button>
    </div>
  )
}

export default AddBtn
