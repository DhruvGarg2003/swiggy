import React, { useContext, useEffect, useState } from 'react';
import Dishes from './Dishes';
import SearchRes from './SearchRes';
import { Cordinates } from '../context/contextApi';

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [dishes, setDishes] = useState([]);
    const [resData, setResData] = useState([]);

    const filterOptions = [
        { filterName: "Restaurant" },
        { filterName: "Dishes" }
    ];
    
    const [activeBtn, setActiveBtn] = useState("Dishes");

    function handleFilterBtn(filterName) {
        setActiveBtn(filterName);
    }
    const {cord :{lat,lng}} = useContext(Cordinates);
    async function fetchDishes() {
        try {
            let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=44548cd4-c8d3-cee2-f503-8c93a9c242b6&submitAction=ENTER&queryUniqueId=1271e340-d47e-c364-7db1-c0f19530c051`);
            let res = await data.json();
            console.log("Dishes Response:", res); // Debugging the API response
            const final = res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter(
                data => data?.card?.card?.info
            ) || [];
            setDishes(final);
        } catch (error) {
            console.error("Failed to fetch dishes:", error);
        }
    }

    async function fetchRestaurantData() {
        try {
            let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=1271e340-d47e-c364-7db1-c0f19530c051&selectedPLTab=RESTAURANT`);
            let res = await data.json();
            console.log("Restaurant Data Response:", res); // Debugging the API response
            const finalData = res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
                data => data?.card?.card?.info
            ) || [];
            setResData(finalData);
        } catch (error) {
            console.error("Failed to fetch restaurant data:", error);
        }
    }

    useEffect(() => {
        if (searchQuery) {
            fetchDishes();
            fetchRestaurantData();
        }
    }, [searchQuery]);
    
    function handleSearchQuery(e) {
        const val = e.target.value;
    
        // Update input field as the user types
        // setSearchQuery(val);
    
        // Check if Enter key (keyCode 13) is pressed
        if (e.keyCode === 13 && val.trim()) {
            setSearchQuery(val);
            console.log("Search Query:", val);
            // You can call any search function here or perform further actions
        }
    }

    return (
        <div className='w-full mt-10 md:w-[800px] mx-auto mt-5'>
            <div className='w-full relative'>
                <i className='fi fi-rr-angle-small-left text-2xl mt-1 ml-2 absolute top-1/2 -translate-y-1/2' />
                <i className='fi fi-rr-search absolute top-1/2 -translate-y-1/2 mr-5 right-0' />
                <input 
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state
                    onKeyDown={handleSearchQuery}
                    value={searchQuery}
                    className='border-2  pl-8 py-3 text-xl focus:outline-none w-full' 
                    type="text" 
                    placeholder='Search for Restaurants and food' 
                />
            </div>
            <div className='my-7 flex gap-3'>
                {filterOptions.map((option) => (
                    <button
                        key={option.filterName}
                        onClick={() => handleFilterBtn(option.filterName)}
                        className={`filterBtn flex gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                            activeBtn === option.filterName ? 'bg-gray-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        <p>{option.filterName}</p>
                    </button>
                ))}
            </div>
            
            <div className='w-full bg-[#f4f5f7] grid grid-cols-2'>
            {
                activeBtn==="Dishes"
                ? dishes.map((data,i)=><Dishes key={i} data={data}/>)
                : resData.map((data,i)=><SearchRes key={i} data={data}/>)
            }
            </div>
        </div>
    );
}

export default Search;
