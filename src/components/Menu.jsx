import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext, Cordinates } from '../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../Utils/cartSlice';
import toast from 'react-hot-toast';
import AddBtn from './AddBtn';

let veg="https://smallimg.pngkey.com/png/small/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
let nonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINFWPFlIwIGkKZksoI0Kjr1V9jOU4fl86hw&s"
function Menu() {
    const {id} = useParams();
    // console.log(id);
    let mainId = id.split("-").at(-1).replace(/\D/g, '');
    // console.log(mainId);
    const [menuData,setMenuData]=useState([])
    const [resInfo,setresInfo]= useState([])
    const [discountData, setdiscountData] = useState([])
    const [topPicksData , setTopdata] = useState(null)
    const {cord :{lat,lng}} = useContext(Cordinates);
    async function fetchMenu(){
        let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        let res = await data.json();
        // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);
        let actualMenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data)=>data?.card?.card?.itemCards ||data?.card?.card?.categories )
        // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

        setTopdata((res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data=>data.card.card.title=="Top Picks")[0])
        setMenuData(actualMenu);
        setresInfo(res?.data?.cards[2]?.card?.card?.info);
        setdiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
    }
    const[Value,setValue]=useState(0);
    const[Value2,setValue2]=useState(0);
    function handleNext() {
        Value>=124?"":setValue((prev) => prev + 31); // Increment translate value by 20
     }
 
     function handlePrev() {
         if (Value > 0) { // Prevent going below 0
             setValue((prev) => prev - 31);
         }
     }
     function handleNext2() {
        Value2>=150?"":setValue2((prev) => prev + 40); // Increment translate value by 20
     }
 
     function handlePrev2() {
         if (Value2 > 0) { // Prevent going below 0
             setValue2((prev) => prev - 31);
         }
     }
    useEffect(()=>{
        fetchMenu();
    },[]);
  return (
    <div className='w-full'>
        <div className='w-[800px]  mx-auto pt-8'>
            <p className='text-[12px] text-slate-500'><Link to={"/"}><span className='hover:text-slate-700 hover:cursor-pointer' >Home</span></Link> / <Link to={"/"}><span className=' hover:text-slate-700 hover:cursor-pointer'>{resInfo?.city}</span></Link> / <span className='text-slate-700'>{resInfo?.name}</span></p>
            <h1 className='font-bold pt-6 text-2xl'>{resInfo?.name}</h1>
            <div className='w-full h-[206px] bg-gradient-to-t from-slate-200/70 mt-3 rounded-[30px] p-4'>
                <div className='w-full h-full border border-slate-200/70 rounded-[30px] bg-white p-4 '>
                    <div className='flex items-center gap-1 font-semibold'>
                    <i className='fi fi-ss-circle-star mt-1 text-green-600 text-lg'></i>
                    <span>{resInfo?.avgRating}</span>
                    <span>({resInfo?.totalRatingString})</span>

                    .
                    
                    <span>{resInfo?.costForTwoMessage}</span>
                   
                   
                    </div>
                    <p className='font-semibold underline text-orange-500'>
                        {Array.isArray(resInfo?.cuisines) ? resInfo?.cuisines.join(", ") : ""}
                    </p>
                    <div className='flex gap-2 mt-3 text-sm'>
                        <div className='w-[8px] flex flex-col justify-center items-center'>
                            <div className='w-[8px] h-[8px] border border-gray-500 rounded-full mt-1 bg-gray-400'></div>
                            <div className='w-[1px] h-[20px] border border-gray-500 bg-gray-400 ' ></div>
                            <div className='w-[8px] h-[8px] border border-gray-500 rounded-full bg-gray-400'></div>
                        </div>
                        <div className='flex flex-col gap-1 font-semibold'>
                            <p>Outlet  <span className='text-gray-500 font-normal'>{resInfo?.locality} </span></p>
                            <p>{resInfo?.sla?.slaString}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full overflow-hidden'>
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-xl'>Deals for you</h1>
                <div className='flex gap-3'>
                    <div onClick={handlePrev} className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                        <i className='fi text-2xl mt-1 fi-rr-arrow-small-left'></i>
                    </div>
                    <div onClick={handleNext}  className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                        <i className='fi text-2xl mt-1  fi-rr-arrow-small-right'></i>
                    </div>
                </div>
            </div>
            <div style={{ transform: `translateX(-${Value}%)`, transition: 'transform 1s ease' }}  className='flex gap-4 mt-4'>
            {
                discountData.map((data,i)=>(
                    <Discount key={i} data={data}/>
                ))
            }
            </div>
            </div>
            <h2 className='text-center mt-5 '>MENU</h2>
            <div className='w-full mt-5 relative hover:cursor-pointer'>
                <div className='w-full p-3 font-semibold text-l bg-slate-200 text-center rounded-xl'>Search for dishes</div>
                <i className='fi fi-rr-search absolute top-3 right-4'></i>
            </div>
            {
                topPicksData &&<div className='w-full overflow-hidden'>
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-xl'>{topPicksData?.card?.card?.title}</h1>
                <div className='flex gap-3'>
                    <div onClick={handlePrev2} className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                        <i className='fi text-2xl mt-1 fi-rr-arrow-small-left'></i>
                    </div>
                    <div onClick={handleNext2}  className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                        <i className='fi text-2xl mt-1  fi-rr-arrow-small-right'></i>
                    </div>
                </div>
            </div>
            <div style={{ transform: `translateX(-${Value2}%)`, transition: 'transform 1s ease' }}  className='flex gap-4 mt-4'>
            {
                topPicksData?.card?.card?.carousel.map(({creativeId,dish:{info:{defaultPrice,price}}},i)=>(
                    // <Discount data={data}/>
                    <div key={i} className='min-w-[384px] h-[395px] relative'>
                        <img className='w-full h-full' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/"+ creativeId}/>
                        <div className='absolute bottom-4 text-white flex justify-between w-full px-5 items-center '>
                            <p className=''>₹{defaultPrice/100 || price/100}</p>
                            <button className='px-10 py-2 font-bold text-green-400 bg-white rounded-xl'>Add</button>
                        </div>
                    
                    </div>

                ))
            }
            </div>
            
            </div>
            }
            <div>
                {
                    menuData.map(({card: {card}},i)=>(

                        <MenuCard key={i} card={card} resInfo={resInfo}/>
                    ))
                }
            </div>
        </div>

    </div>
  );
}


function Discount({data : {info :{header,offerLogo,couponCode}}}){

    return (
        <div className='flex min-w-[328px] h-[76px] border p-2 rounded-xl gap-2 items-center'>
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo}></img>
            <div>
                <h2 className='font-bold'>{header}</h2>
                <p className='text-gray-500'>{couponCode}</p>
            </div>
        </div>
    )
}
function MenuCard({card,resInfo}){
    let hello = false;
    if(card['@type']){
        hello=true;
    }
    const[isOpen,setIsOpen] = useState(hello)
    function toggleDropDown(){
        setIsOpen((prev)=>!prev)
    }
    if(card.itemCards){
        const {title,itemCards}=card;
        return (
        <>
            <div className='mt-7'>
                <div className='flex justify-between'>
                     <h1 className={'font-bold text-'+(card['@type']? 'xl':'base')}>{title} ({itemCards.length})</h1>
                    <i className={'fi text-2xl fi-rr-angle-small-'+(isOpen? 'up':'down') }onClick={toggleDropDown}></i>
                </div>
                {
                    isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo}/>
                }
            </div>
            <hr className={'my-5 border-'+(card['@type']? '[5px]': '[2px]')} />
        </>
        )
    }
    else{
        const {title,categories}=card;
        return (
            <div>
                <h1 className='font-bold text-xl'>{card.title}</h1>
                {
                    categories.map((data,i)=>(
                        <MenuCard key={i} card={data} resInfo={resInfo}/>
                    ))
                }
            </div>
        )
    }
}

function DetailMenu({itemCards,resInfo}){


    return (
        <div className='my-5'>
            {
                itemCards.map(({card:{info}},i)=>(
                    <DetailMenuCard key={i} info={info} resInfo={resInfo} />
                ))
            }
        </div>
    )
}
function DetailMenuCard({info,resInfo}){
    
    const {name,
        defaultPrice,
        price,
        itemAttribute,
        ratings:{aggregatedRating:
            {rating,
            ratingCountv2}}
        ,description="",
        imageId
    } = info;
        // const {cartData,setCartData} = useContext(CartContext);
        const cartData = useSelector((state)=> state.cartSlice.cartItems)

        const [isDiffRes,setIsDiffRes] = useState(false);

        const getResInfo =  useSelector((state)=> state.cartSlice.resInfo)
        const dispatch = useDispatch();
        function handleAddcart() {
            const isAdded = cartData.find((data) => data.id === info.id);
        
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
                    setIsDiffRes(!isDiffRes);
                    toast.error("different Resturant")
                }
            } else {
                toast.error("already added");
                // alert("Item already added to the cart.");
            }
        }
        function handleIsDiff(){
            setIsDiffRes(!isDiffRes);
        }
        function handleClear(){
            dispatch(clearCart())
            setIsDiffRes(!isDiffRes);
            // setCartData([])
            // localStorage.clear();
        }
        const [isMore,setIsMore] = useState(false)
        let trimDes = description.substring(0,140)
        return (
       <div className='relative w-full'>
       <div className='flex w-full justify-between min-h-[182px]'>
            <div className='w-[70%]'>
                <img className='w-[20px]' src={(itemAttribute && itemAttribute.vegClassifier==="VEG"? veg:nonVeg)} /> 
                <h2 className='font-bold text-xl'>{name}</h2>
                <p className='font-semibold'>₹{defaultPrice/100 || price/100}</p>
                <div className='flex items-center gap-1'>
                <i className='fi fi-ss-star text-orange-500'></i> 
                <span>
                    {rating?.length>0 ? ` ${rating}` : ""}
                    {ratingCountv2?.length > 0 ? ` (${ratingCountv2})` : ""}
                </span>
                </div>
                {
                    description.length >140 ?<div>
                        <span className=''>{isMore ? description : trimDes}</span>
                        {
                            <button className='font-bold' onClick={()=>setIsMore(!isMore)}>{isMore?" less":"...more"}</button>
                        }
                    </div> : <span className=''>{description}</span>
                }

            </div>
            <div className='w-[20%] relative h-full'>
                <img className='rounded-xl aspect-square' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/' + imageId}></img>
                <button onClick={handleAddcart} className='bg-white text-lg font-bold text-green-700  border px-10 py-2 drop-shadow rounded-xl absolute bottom-[-20px] left-5'>Add</button>
                {/* <AddBtn info={info} resInfo={resInfo}/> */}
            </div>
        </div>
        <hr className='my-5' />
        {
            isDiffRes && (
                <div className='w-[520px] h-[204px] border p-8 fixed bottom-10 left-[33%] z-50 bg-white flex flex-col gap-2'>
                    <h1 className='font-bold text-xl'>Items already in cart</h1>
                    <p className='text-slate-600'>Your cart contains items from other restaurant. 
                        Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className='flex justify-between gap-3 w-full'>
                        <button onClick={handleIsDiff} className='border w-1/2 p-3 border-green-600 border-2 text-green-600'>NO</button>
                        <button onClick={handleClear} className='border w-1/2 p-3 bg-green-600 text-white'>YES,START AFRESH</button>
                    </div>

                </div>
            )
        }
        </div>
    )
}

export default Menu
