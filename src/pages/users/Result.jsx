import React, { useEffect } from 'react';
import SinglePdf from '../../components/pdf';
import { useNavigate } from 'react-router-dom';

import { IoArrowBackOutline, IoPrint  } from "react-icons/io5";

const Result = () => {
  const navigate = useNavigate();
    
    useEffect(()=>{
       
    },[])

    return (
        <section className='bg-gray-100 h-screen w-screen flex justify-center items-center'>
            <button onClick={()=>navigate('/list')} className="absolute top-4 left-4 text-blue-900 rounded-full px-4 py-2">
                <IoArrowBackOutline className='text-2xl'/>
            </button>
            <SinglePdf  />
            <button className="absolute top-4 right-4 text-blue-900 rounded-full px-4 py-2">
                <IoPrint className='text-2xl'/>
            </button>
        </section>
    )

  return (
    <div>Result</div>
  )
}

export default Result