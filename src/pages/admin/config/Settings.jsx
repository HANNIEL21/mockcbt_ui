import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
const Settings = () => {
  const location = useLocation();


  const links = [
    { name: 'general', path: '/dashboard/settings' },
    { name: 'group', path: '/dashboard/settings/group' },
    { name: 'Faculty', path: '/dashboard/settings/faculty' },
    { name: 'department', path: '/dashboard/settings/department' },
    { name: 'course', path: '/dashboard/settings/course' },
  ]

  const selected = location.pathname;

  return (
    <div className='bg-white w-full h-full p-10'>
      <div className='flex w-ful gap-3 justify-start p-2 items-center border-b-2 border-blue-900 '>
        {
          links.map((item, i)=>(
            <Link to={item.path} className={`text-base font-bold capitalize ${item.path ===  selected ? "border-2 border-blue-900 text-blue-900 p-1 px-2 rounded-lg" : "text-slate-400"}`}>{item.name}</Link>
          ))
        }
      </div>

      <div className="h-full w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
