import React from 'react'
import { Link } from 'react-router-dom'

function SearchRes({ data :{card: 
    { card: 
        { info: { id, cloudinaryImageId, aggregatedDiscountInfoV3 = {}, cuisines, promoted = false, costForTwoMessage, name: resName, avgRating, sla: { slaString } } } } } }) {
    return (
        <Link to={`/resturantMenu/${id}`}>
       <div className='bg-white p-4 m-4 flex gap-4 items-center'>
            <div className='w-[30%]'>
                <img
                className='aspect-square rounded-lg'
                 src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/` + cloudinaryImageId}/>
            </div>
            <div className='w-[60%]'>
                 <p className='line-clamp-1 font-bold'>{resName}</p>
                 <div className='flex items-center gap-1 opacity-50'>
                    <i className='fi fi-ss-star' />
                    <span>{avgRating}</span>
                    <span>{costForTwoMessage}</span>
                </div>
                <p className='line-clamp-1'>{cuisines.join()}</p>
            </div>
       </div>
       </Link>
      )
}

export default SearchRes
