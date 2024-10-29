import React from 'react'
import { Link } from 'react-router-dom'

function Card({resturant}) {
   // console.log(resturant);  // Log the whole restaurant object
//    console.log(resturant);
    const links = resturant?.cta?.link;   
    console.log(links.split("/")); 
  return (
    <Link to={`/resturantMenu/${links.split("/").at(-1)}`}>
      <div 
                                key={resturant?.info?.id} 
                                className='min-w-[295px] h-auto relative'> {/* Make container flexible */}
                                
                                {/* Image */}
                                <img
                                    className='w-full rounded-2xl aspect-video object-cover'
                                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resturant?.info?.cloudinaryImageId}`}
                                    alt={resturant?.info?.name}
                                />
                                
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-2xl"></div> {/* Inset positions it on top */}
                                
                                <div className="absolute bottom-2 left-2 text-white font-bold"> {/* Sample text on the image */}
                                    {
                                        resturant?.info?.aggregatedDiscountInfoV3 ? resturant?.info?.aggregatedDiscountInfoV3?.header + " "+ resturant?.info?.aggregatedDiscountInfoV3?.subHeader  : "" 
                                    }
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h2 className='text-lg font-semibold'>{resturant?.info?.name}</h2>
                                <p className='flex items-center gap-1 text-base font-semibold '><i className='fi fi-ss-circle-star text-green-600 text-l'></i>{resturant?.info?.avgRating}.{" "}<span>{resturant?.info?.sla?.slaString}</span></p>
                                <p className='line-clamp-1 text-black/60 font-med'>{resturant?.info?.cuisines.join(", ")}</p>
                                <p className='line-clamp-1 text-black/60 font-med'>{resturant?.info?.locality}</p>
                            </div>
    </Link>
  )
}

export default Card
