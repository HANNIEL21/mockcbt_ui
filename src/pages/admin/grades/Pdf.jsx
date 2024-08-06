import React from 'react'

const Pdf = () => {
    return (
        <section className='h-screen w-screen flex justify-center items-center'>
            <div className='p-12 h-full w-[50%]'>
                <header className='h-30 w-full flex justify-center items-center'>
                    <div className=''>
                        <img src="/assets/rsul-logo.png" alt="" className='h-40' />
                    </div>
                    <div className='w-3/4 text-center'>
                        <h1 className='text-4xl font-bold capitalize text-center '>rivers state university of science and technology</h1>

                    </div>
                </header>
                <main className='px-20 text-center'>
                    <div>
                        <p className='text-2xl font-bold capitalize'>Examination Name</p>
                        <p className='text-xl font-bold capitalize'>Result</p>
                    </div>
                    <div>
                        <div className='capitalize'>
                            <p>first name:<span></span></p>
                            <p>last name:<span></span></p>
                            <p>gender:<span></span></p>
                            <p>email:<span></span></p>
                            <p>phone number:<span></span></p>
                            <p>examination number:<span></span></p>
                            <p>seat number:<span></span></p>
                            <p>Total questions:<span></span></p>
                            <p>attempted questions:<span></span></p>
                        </div>
                        <div>

                        </div>
                    </div>
                </main>
                <footer className='bg-gray-200 h-30 w-full'></footer>
            </div>
        </section>
    )
}

export default Pdf