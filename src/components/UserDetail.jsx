import React from 'react';
import { useSelector } from "react-redux";
import { MdPerson } from 'react-icons/md';
import { baseApiUrl } from '../utils/constants';

const UserDetail = () => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='h-44 w-44 rounded-xl bg-gray-300 mb-10 flex justify-center items-center'>
      {
            userDetails?.avatar ? (
              <>
                <img src={`${baseApiUrl}/images/${userDetails?.avatar}`} alt="User Avatar"
                  className='w-[85%] h-[85%] rounded-md shadow-md' />
              </>
            ) : (
              <div className='bg-white shadow-md rounded-xl h-52 w-52 flex items-center justify-center'>
                <MdPerson className='text-blue-800 text-6xl' />
              </div>
            )
          }
      </div>
      <div className='text-start capitalize font-bold flex flex-col justify-center gap-4'>
        {userDetails?.firstname &&  <h3 className='text-sm'>first name: <span className='font-extrabold text-blue-900'>{userDetails?.firstname}</span></h3>  }
        {userDetails?.lastname &&  <h3 className='text-sm'>last name: <span className='font-extrabold text-blue-900'>{userDetails?.lastname}</span></h3>  }
        {userDetails?.gender &&  <h3 className='text-sm'>gender: <span className='font-extrabold text-blue-900'>{userDetails?.gender}</span></h3>  }
        {userDetails?.examno &&  <h3 className='text-sm'>exam number: <span className='font-extrabold text-blue-900'>{userDetails?.examno}</span></h3>  }
        {userDetails?.seatno &&  <h3 className='text-sm'>seat number: <span className='font-extrabold text-blue-900'>{userDetails?.seatno}</span></h3>  }
      </div>
    </div>
  )
}

export default UserDetail