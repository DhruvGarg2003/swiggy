import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../Utils/cartSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../Utils/ToggleSlice';

let veg = "https://smallimg.pngkey.com/png/small/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINFWPFlIwIGkKZksoI0Kjr1V9jOU4fl86hw&s";

function Cart() {
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.cartSlice.cartItems) || []; // Fallback to empty array
    const resInfo = useSelector((state) => state.cartSlice.resInfo);
    const userData = useSelector((state) => state.authSlice.userData);
    const dispatch = useDispatch();

    // Ensure cartData is an array
    if (!Array.isArray(cartData)) {
        console.error("cartData is not an array:", cartData);
        return null; // or render a fallback UI
    }

    const totalPrice = cartData.reduce((acc, item) => {
        return acc + (item.price ?? item.defaultPrice) / 100;
    }, 0);

    if (cartData.length === 0) {
        return (
            <div className='w-full'>
                <div className='flex mt-0 gap-2 justify-center items-center flex-col h-screen'>
                    <img className='w-[238px] h-[238px]' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png' alt="Empty Cart" />
                    <h1 className='font-bold text-2xl'>Your cart is empty</h1>
                    <div className='text-sm text-slate-600'>You can go to home page to view more restaurants</div>
                    <Link to={"/"} className='bg-orange-600 p-2 inline-block'>See restaurants near you</Link>
                </div>
            </div>
        )
    }

    function handleRemove(i) {
        if (cartData.length > 1) {
            // If there is more than one item, remove the specific item
            const itemId = cartData[i].id; // Get the ID of the item to be removed
            dispatch(deleteItem({ id: itemId })); // Dispatch the delete action with the item's ID
        } else {
            // If there is only one item, clear the cart
            handleClear(); // Call handleClear to remove all items
        }
    }
    function handleClear() {
        dispatch(clearCart());
    }

    function handlePlace() {
        if (!userData) {
            toast.error("Login please");
            dispatch(toggleLogin());
            return;
        } else {
            toast.success("Order Placed");
        }
    }

    return (
        <div className='w-full'>
            <div className='w-[70%] mx-auto'>
                <Link to={`/resturantMenu/${resInfo?.id}`}>
                    <div className='my-10 flex gap-5 items-center'>
                        <img className='rounded-xl w-40 aspect-square' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/' + resInfo?.cloudinaryImageId} alt={resInfo?.name} />
                        <div>
                            <p className='text-5xl border-b-2 border-black pb-3'>{resInfo?.name}</p>
                            <p className='mt-3 text-xl'>{resInfo.areaName}</p>
                        </div>
                    </div>
                </Link>

                <div>
                    {cartData.map(({ name, defaultPrice, price, itemAttribute, ratings: { aggregatedRating: { rating, ratingCountv2 } }, description = "", imageId },i) => {
                        let trimDes = description.substring(0, 140);
                        return (
                            <div className='flex w-full justify-between min-h-[182px]' key={i}>
                                <div className='w-[70%]'>
                                    <img className='w-[20px]' src={itemAttribute && itemAttribute.vegClassifier==="VEG"? veg:nonVeg} />
                                    <h2 className='font-bold text-xl'>{name}</h2>
                                    <p className='font-semibold'>₹{defaultPrice / 100 || price / 100}</p>
                                    <div className='flex items-center gap-1'>
                                        <i className='fi fi-ss-star text-orange-500'></i>
                                        <span>
                                            {rating?.length > 0 ? ` ${rating}` : ""}
                                            {ratingCountv2?.length > 0 ? ` (${ratingCountv2})` : ""}
                                        </span>
                                    </div>
                                    <div className='line-clamp-2'>{description}</div>
                                </div>
                                <div className='w-[20%] relative h-full my-5'>
                                    <img className='rounded-xl aspect-square' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/' + imageId} alt={name} />
                                    <button onClick={() => handleRemove(i)} className='bg-white text-lg font-bold text-red-500 border px-10 py-2 drop-shadow rounded-xl absolute bottom-[-20px] left-5'>Remove</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h1>Total-₹{totalPrice.toFixed(2)}</h1>
                <div className='flex justify-between'>
                    <button onClick={handleClear} className='p-3 bg-green-600 rounded-lg my-7'>Clear Cart</button>
                    <button onClick={handlePlace} className='p-3 bg-green-600 rounded-lg my-7'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
