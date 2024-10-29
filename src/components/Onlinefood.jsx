import React, { useState } from 'react'
import Card from './card';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../Utils/filterSlice';
function Onlinefood({data,title}) {
    const filterOptions =[
        {
            filterName : "Ratings 4.0+"
        },
        {
            filterName : "Rs.300-Rs.600"
        },
        {
            filterName : "Less than Rs.300"
        }
    ]
    const [activeBtn,setActiveBtn] = useState(null)
    const dispatch = useDispatch();
    function handleFilterBtn(filterName){
        setActiveBtn(activeBtn===filterName ? null:filterName)
    }
    dispatch(setFilterValue(activeBtn));
  return (
    <div className='mt-10'>
      <h1 className='font-bold text-3xl'>{title}</h1>
      <div className='my-7 flex gap-3'>
            {
                filterOptions.map((data)=>(
                    <button
                    key={data.filterName}
                    onClick={() => handleFilterBtn(data.filterName)}
                    className={`filterBtn flex gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                        activeBtn === data.filterName ? 'bg-gray-600 text-white' : 'bg-white text-black'
                    }`}
                    >
                    <p>{data.filterName}</p>
                    <i className={`fi mt-1 text-sm fi-br-cross ${activeBtn === data.filterName ? '' : 'hidden'}`}></i>
                </button>
                ))
            }
        </div>
      <div className='grid grid-cols-4 gap-6 mt-4'>
      {
                         data.map((resturant,i) => (
                            <div key={i} className='hover:scale-90 duration-300'>
                            <Card resturant={resturant}/>
                             </div>
                            
                        ))
        }
    </div>
    </div>
  )
}

export default Onlinefood
