import React, { useState,useEffect } from 'react'
import Card from './card';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../Utils/filterSlice';

function TopResturant({data,title}) {
    // const[data,setData]= useState([]);
    const[value,setValue]=useState(0);
    // async function fetchData() {
    //     const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     const result =  await data.json()
    //     console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    // }
    // useEffect(()=>{
    //     fetchData();
    // },[])
    function handleNext() {
       value>=124?"":setValue((prev) => prev + 31); // Increment translate value by 20
    }

    function handlePrev() {
        if (value > 0) { // Prevent going below 0
            setValue((prev) => prev - 31);
        }
    }
  return (
    <div className='mt-10'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <div className='flex gap-3'>
                <div onClick={handlePrev} className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                <i className='fi text-2xl mt-1 fi-rr-arrow-small-left'></i>
                </div>
                <div onClick={handleNext}  className='bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center'>
                    <i className='fi text-2xl mt-1  fi-rr-arrow-small-right'></i>
                </div>
            </div>
        </div>
        <div 
        style={{ transform: `translateX(-${value}%)`, transition: 'transform 1s ease' }} 
        className={`flex mt-4 gap-5 translate-x-[${value}%] duration-1000`}>
                    {
                         data.map((resturant,i) => (
                            <div key={i} className='hover:scale-90 duration-300'>
                             <Card resturant={resturant}/>
                            </div>
                        ))
                    }
        </div>
      <hr className='border'/>
      
    </div>
  )
}

export default TopResturant
