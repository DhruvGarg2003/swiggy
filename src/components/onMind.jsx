import React,{useEffect, useState} from 'react'

function OnMind({data}) {
    // const[data,setData]= useState([]);
    const[value,setValue]=useState(0);
    // async function fetchData() {
    //     const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     const result =  await data.json()
    //     console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //     setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
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
    <div>
        <div className='flex justify-between'>
            <h1 className='font-bold text-4xl'>What's on your mind?</h1>
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
        className={`flex mt-4 translate-x-[${value}%] duration-1000`}>
                    {
                        data.map((item) => (
                            <img
                                key={item.imageId} // Always use a unique `key` when rendering lists
                                className='w-40'
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                                alt="Swiggy Item"
                            />
                        ))
                    }
        </div>
      <hr className='border'/>
      
    </div>
  )
}

export default OnMind
