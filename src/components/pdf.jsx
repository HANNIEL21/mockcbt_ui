import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const SinglePdf = ({ user }) => {
    const dispatch = useDispatch();

    const { userDetails } = useSelector((state) => state.user);
    const { examDetails, result } = useSelector((state) => state.exam);

    console.log(result);

    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            <div className='h-full w-[50%] bg-white shadow-lg p-4'>

                <header className='h-30 w-full flex justify-center items-center'>
                    <div className=''>
                        <img src="./rsul-logo.png" alt="app logo" className='md:h-24 lg:h-40' />
                    </div>
                    <div className='md:w-2/4 lg:w-3/4 text-center'>
                        <h1 className="md:text-2xl lg:text-4xl font-bold capitalize bg-gradient-to-r from-green-700 to-blue-700 text-transparent bg-clip-text">rivers state university</h1>
                        <p className='md:text-2xl lg:text-4xl font-bold capitalize'>{result.exam + "-" + result.title}</p>
                    </div>
                </header>


                <main className='px-10'>
                    <p className='font-bold capitalize underline text-center my-5 '>user information</p>
                    <section>
                        <div>
                            {result.firstname && <p className='capitalize font-bold'>firstname: <span className='font-semibold'>{result.firstname}</span></p>}
                            {result.lastname && <p className='capitalize font-bold'>lastname: <span className='font-semibold'>{result.lastname}</span></p>}
                            {result.gender && <p className='capitalize font-bold'>gender: <span className='font-semibold'>{result.gender}</span></p>}
                            {result.exam && <p className='capitalize font-bold'>exam: <span className='font-semibold'>{result.exam}</span></p>}
                            {result.examno && <p className='capitalize font-bold'>exam no: <span className='font-semibold'>{result.examno}</span></p>}
                            {result.seatno && <p className='capitalize font-bold'>seat no: <span className='font-semibold'>{result.seatno}</span></p>}
                            {result.group && <p className='capitalize font-bold'>group: <span className='font-semibold'>{result.group}</span></p>}
                            {result.email && <p className='capitalize font-bold'>email: <span className='font-semibold'>{result.email}</span></p>}
                            {result.phone && <p className='capitalize font-bold'>phone: <span className='font-semibold'>{result.phone}</span></p>}
                            {result.sub && <p className='capitalize font-bold'>Course: <span className='font-semibold'>{result.sub}</span></p>}
                        </div>
                        <div></div>
                    </section>
                    <p className='font-bold capitalize underline text-center my-4 '>result</p>
                    <section>
                        <table className="w-full table-auto">
                            <thead className="capitalize">
                                <tr className="border-2">
                                    <th className="border-2">course</th>
                                    <th className="border-2">no of questions</th>
                                    <th className="border-2">attempted</th>
                                    <th className="border-2">score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {result.course && <td className='text-center'>{result.course }</td>}
                                    {result.questions ? (<td className='text-center'>{result.questions}</td>) : (<td>{0}</td>)}
                                    {result.attempt ? (<td className='text-center'>{result.attempt}</td>) : (<td>{0}</td>)}
                                    {result.score ? (<td className='text-center'>{result.score}</td>) : (<td>{0}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default SinglePdf;