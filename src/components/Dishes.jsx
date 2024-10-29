import React from 'react';
import { nonVeg, veg } from '../Utils/links';
import AddBtn from './AddBtn';

function Dishes({data:{card:{
     card:{
        info,
        restaurant:{
            info:resInfo
        }
    }
}}}){

    // console.log(resName)
let {imageId="",name,price,isVeg=0} = info
let {
    id,
    name:resName,
    avgRating,
    sla:{slaString}
} = resInfo
  return (
    <div className='bg-white rounded-2xl p-4 m-4'>
        <div className='flex justify-between text-sm items-center'>
            <div>
                <p>By {resName}</p>
                <div className='flex items-center gap-1 opacity-50'>
                    <i className='fi fi-ss-star' />
                    <span>{avgRating}</span>
                    <span>{slaString}</span>
                    </div>
                </div>
                <i className='fi fi-rr-arrow-small-right text-2xl'></i>
            </div>
        <hr className='border-dotted'/>
        <div className='flex my-3 justify-between gap-3'>
            <div className='w-[50%]'>
                <div className='w-5 h-5'>
                    {
                        isVeg ? <img src={veg} /> : <img src={nonVeg} />
                    }
                </div>
                <p className='my-2 text-lg font-semibold'>{name}</p>
            </div>
            <div className='w-[50%]'>
            <div className='w-[60%] relative h-full'>
                <img className='rounded-xl object-cover aspect-square mx-8' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/' + imageId}></img>
                {/* <button className='bg-white text-lg font-bold text-green-700  border px-10 py-2 drop-shadow rounded-xl absolute bottom-[-20px] left-5'>Add</button> */}
                <AddBtn info={info} resInfo={resInfo}/>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Dishes;

