import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const DashboardLayout = () => {
    
    return (
        <div className="flex bg-slate-100 h-screen ">
            <Sidebar />
            <main className="w-full h-screen text-3xl flex flex-col gap-5 p-5 overflow-auto">
                <div className='h-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout;
