import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CartContext, Cordinates, Visibilty } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin, toggleSearchBar } from '../Utils/ToggleSlice';
import SignIn from './SignIn';

function Head() {
    // const {visible,setVisible}=useContext(Visibilty);

    const visible = useSelector((state)=>state.ToggleSlice.searchToggle)
    const userData = useSelector((state)=>state.authSlice.userData);
    const LoginVisible = useSelector((state)=>state.ToggleSlice.loginToggle)
    const dispatch = useDispatch()

    const [searchResult, setSearchResult] = useState([])
    const {cord,setCord} = useContext(Cordinates);
    // const {cartData,setCartData} = useContext(CartContext);
    const cartData = useSelector((state)=> state.cartSlice.cartItems)
    const [address,setAddress]=useState("")
    function handleVisibility(){
        // setVisible((prev)=>!prev)
        dispatch(toggleSearchBar())
    }
    async function searchResultFun(val){
        if(val== "") return
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`);
        const data = await res.json();
        setSearchResult(data?.data)
    }
    async function fetchlat(id){
        if(id== "") return
        handleVisibility()
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`);
        const data = await res.json();
        setCord({
            lat : data.data[0].geometry.location.lat,
            lng : data.data[0].geometry.location.lng
        })
        setAddress(data?.data[0]?.formatted_address)
    }
    function handleLogin(){
        dispatch(toggleLogin());
    }
  return (
    <>
        <div className='w-full'>
                <div onClick={handleVisibility} className={`w-full bg-black/50 z-30 h-full absolute ${visible ? "visible" : "invisible"}`}></div>
                <div className={`bg-white w-[40%] flex justify-end h-full p-5 z-40 absolute duration-500 ${visible ? "left-0" : "-left-[100%]"}`}>
                    <div className='flex flex-col gap-4 mt-4 w-[50%] mr-6'>
                    <i className='fi fi-br-cross' onClick={handleVisibility}></i>
                    <input type="text" className='border p-5 focus: outline-none focus:shadow-lg' onChange={(e)=> searchResultFun(e.target.value)}/>
                    <div className='border p-5 '>
                        <ul>
                            {
                                searchResult.map((data,i)=>(
                                    <div key={i} className='my-5'>
                                        <div className='flex gap-3'>
                                            <i className='fi mt-1 fi-rr-marker'></i>
                                            <li onClick={()=>fetchlat(data.place_id)}>{data.structured_formatting.main_text} 
                                            <p className='text-sm opacity-65'>{data.structured_formatting.secondary_text}</p>
                                            <p className='text-slate-400'>--------------------------</p>
                                            </li>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                    </div>
                </div>
        </div>
        <div className='w-full'>
                <div onClick={handleLogin} className={`w-full bg-black/50 z-30 h-full absolute ${LoginVisible ? "visible" : "invisible"}`}></div>
                <div className={`bg-white w-[40%] flex h-full p-5 z-40 absolute duration-500 ${LoginVisible ? "right-0" : "-right-[100%]"}`}>
                    <div className='m-4 w-[70%]'>
                    <i className='fi fi-br-cross' onClick={handleLogin}></i>
                    <div className=' my-10 w-full flex justify-between items-center'>
                        <h2 className='font-bold text-4xl border-b-2 border-black pb-5'>Login</h2>
                        <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" />
                    </div>
                    <SignIn />
                    <p className='text-sm mt-4 opacity-70'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
                    </div>
                </div>
        </div>
        <div className='relative w-full'>
            
        <div className='w-full shadow-md h-24 flex justify-center items-center'>
        <div className=' w-[70%] flex justify-between'>
            <div className='flex items-center'> 
                <Link to={"/"}><img className='w-24' src='https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png'></img></Link>
                <div className='flex items-center gap-2' onClick={handleVisibility}>
                <p className='flex items-center '> 
                    <span className='font-bold border-b-2 border-black'>others</span> 
                    <span className='ml-2 max-w-[200px] text-sm opacity-85 line-clamp-1'>{address}</span>
                </p>
                <i className='fi text-2xl mt-2 text-orange-500 fi-rs-angle-small-down'></i>
                </div>
            </div>
            <div className='flex items-center gap-8'>
                <Link to={"/search"}>
                    <div className='flex'>
                        <i className='fi fi-rr-search'></i>
                        <p>Search</p>
                    </div>
                </Link>
                
                <div onClick={handleLogin}> 
                    <div className='flex items-center'> {/* Added 'items-center' to vertically align items */}
                        { userData ? (
                            <>
                                <img src={userData.photo} alt="User" className="w-8 h-8 rounded-full"/> {/* Added alt attribute and classes for styling */}
                                <p className='ml-2'>{userData.name}</p> {/* Added username with margin-left for spacing */}
                            </>
                        ) : (
                            <div className='flex'>
                                <i className='fi fi-rr-user'></i>
                                <p>Sign In</p>
                            </div>
                        )}
                    </div>
                </div>
                
                <Link to={"/cart"}>
                    <div className='flex'>
                        <i className='fi fi-rr-shopping-cart-add'></i>
                        <p>Cart <span>{cartData.length}</span></p>
                    </div>
                </Link>
            </div>
        </div>
        </div>
        <Outlet></Outlet>
        </div>
    </>
  )
}

export default Head
