import React from 'react'

const General = () => {
    return (
        <main className='py-5 '>
            <h3 className='text-xl font-extrabold capitalize text-blue-900'>App Settings</h3>
            <section className='py-4'>
                <div className='w-2/4 flex flex-col gap-2 px-3'>
                    <label htmlFor="" className='w-full flex items-center justify-between'>
                        <span className='uppercase font-bold text-base text-slate-400'>app name : </span>
                        <input type="text" className='w-3/4 p-2 bg-slate-200 shadow-md rounded-md placeholder:text-sm text-base ' placeholder='APP NAME' />
                    </label>
                    <label htmlFor="" className='w-full flex items-center justify-between'>
                        <span className='uppercase font-bold text-base text-slate-400'>ip adddress : </span>
                        <input type="text" className='w-3/4 p-2 bg-slate-200 shadow-md rounded-md placeholder:text-sm text-base ' placeholder='IP ADDRESS' />
                    </label>
                    <label htmlFor="" className='w-full flex items-center justify-between'>
                        <span className='uppercase font-bold text-base text-slate-400'>Loading time : </span>
                        <input type="text" className='w-3/4 p-2 bg-slate-200 shadow-md rounded-md placeholder:text-sm text-base ' placeholder='LOADING TIME' />
                    </label>
                </div>
            </section>
            <div className='flex items-center justify-end'>
                <button className="border-2 border-green-700 hover:bg-green-300 text-green-700 font-bold text-lg uppercase rounded-md px-3 py-1 focus:outline-none">save</button>
            </div>
        </main>
    )
}

export default General