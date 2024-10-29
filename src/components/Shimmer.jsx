import React from 'react'

function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full text-white flex justify-center items-center gap-5 flex-col h-[350px] bg-slate-900'>
            <div className='relative flex items-center justify-center mt-1'>
            <img className='w-10 absolute mt-1' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa'></img>
            <span className="loader"></span>
            </div>
            <h1 className='text-2xl'>Looking for great food near you...</h1>
        </div>
        <div className='w-[70%] mx-auto pt-3 flex flex-wrap gap-9'>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300  animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='w-[295px] h-[182px] bg-gray-300 animate-pulse rounded-md'></div>
        </div>
       
    </div>
  )
}

export default Shimmer

