import React,{useContext, useEffect, useState} from 'react'
import OnMind from './onMind';
import TopResturant from './TopResturant';
import Onlinefood from './Onlinefood';
import { Cordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';
import filterSlice from '../Utils/filterSlice';
import Shimmer from './Shimmer';

function Body() {
    const[TopResturantData,setTopResturantData]= useState([]);
    const [city,setCity] = useState("");
    const [top,setTop]=useState("");
    const[Minddata,setMinddata]=useState([]);
    const[value,setValue]=useState(0);
    const {cord :{lat,lng}} = useContext(Cordinates);
    const [data,setData]=useState({});
    async function fetchData() {
        const data=await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const result =  await data.json()
        // console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setData(result?.data)
        setCity(result?.data?.cards[1]?.card?.card?.header?.title);
        setTop(result?.data?.cards[2]?.card?.card?.title);
        setMinddata(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setTopResturantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    useEffect(()=>{
        fetchData();
    },[lat,lng])
    // function handleNext() {
    //    value>=124?"":setValue((prev) => prev + 31); // Increment translate value by 20
    // }

    // function handlePrev() {
    //     if (value > 0) { // Prevent going below 0
    //         setValue((prev) => prev - 31);
    //     }

    if(data.communication){
        return (
            <div className='flex justify-center items-center flex-col h-screen'>
                <img className='w-[238px] h-[238px]' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png'></img>
                <h1 className='font-bold text-xl'>Location Unserviceable</h1>
                <div className='text-slate-600 text-sm'>We don't have any services here till now. Try changing location.</div>
            </div>
        )
    }
    const filterVal =useSelector((state=> state.filterSlice.filterVal));
    console.log(filterVal);
    const filteredData = TopResturantData.filter(item=>{
        if(!filterVal) return;
        switch(filterVal){
            case "Ratings 4.0+" : return item?.info?.avgRating >4 
            case "Offers" : return true;
            case "Rs.300-Rs.600": return item?.info?.costForTwo?.slice(1,4) >=300 && item?.info?.costForTwo?.slice(1,4)<=600
            case "Less than Rs.300": return item?.info?.costForTwo?.slice(1,4)<300
            default: return;
        }
    })
  return (
    <div className='w-full '>
        {
            TopResturantData.length ? (
                <div className='w-[75%] mx-auto mt-3 overflow-hidden'>
                <OnMind data={Minddata}/>
                <TopResturant data={TopResturantData} title={city} />
                <Onlinefood data={ filterVal ?filteredData : TopResturantData} title={top}/>
    
          </div>
            ) : (
            <Shimmer />
        )
        }
    </div>
  )
}
export default Body
