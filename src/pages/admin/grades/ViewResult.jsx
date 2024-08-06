import React, { useEffect } from 'react';
import axios from 'axios';
import logo from "../../../assets/rsu-logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { setResultDetails, setError, setLoadingTrue, setLoadingFalse } from '../../../redux/Features/Result';
import { baseApiUrl } from '../../../utils/constants';

const ViewResult = ({ rId, closeViewResultModal }) => {
    const dispatch = useDispatch();
    const { resultDetails } = useSelector((state) => state.result)

    useEffect(() => {
        dispatch(setLoadingTrue());
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/result.php?id=${rId}`);

                if (response.status === 200) {
                    const resultData = response.data;
                    dispatch(setResultDetails(resultData));
                } else {
                    dispatch(setError('Failed to fetch result data'));
                }
            } catch (error) {
                setError('An error occurred while fetching result data');
            } finally {
                setTimeout(() => {
                    dispatch(setLoadingFalse());
                }, 2000);
            }
        };

        fetchUserData();
    }, [rId,dispatch,resultDetails.exam]);

    return (
        <div>
            <div className="bg-white h-[700px] w-[595px] flex flex-col items-center py-10 relative">
            <button
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
                onClick={closeViewResultModal}
            >
                Close
            </button>
            <button
                className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                onClick={() => window.print()}
            >
                Print
            </button>
            <header className='h-30 w-full flex justify-center items-center'>
                <div className='w-2/12'>
                    <img src={logo} alt="" className='h-30' />
                </div>
                <div className='w-9/12 text-center'>
                    <h1 className='text-2xl font-bold capitalize text-center text-blue-900'>rivers state university of science and technology</h1>
                    <p className='text-xl font-bold capitalize italic mt-2 text-gray-600'>{resultDetails.exam}</p>
                </div>
            </header>
            <main className='h-[40%] w-full px-10 text-center'>
                <div className='my-4'>
                    <p className='font-semibold text-blue-900'>Candidate Result</p>
                </div>
                <div className='h-full flex items-center justify-between'>
                    <div className='h-full capitalize flex flex-col justify-evenly items-start '>
                        {resultDetails.type === "EXAMINER" ? (
                            <>
                                <p className='text-gray-700'>user name:<span className='text-blue-900'>{resultDetails.username}</span></p>
                                <p className='text-gray-700'>first name:<span className='text-blue-900'>{resultDetails.firstname}</span></p>
                                <p className='text-gray-700'>last name:<span className='text-blue-900'>{resultDetails.lastname}</span></p>
                                <p className='text-gray-700'>gender:<span className='text-blue-900'>{resultDetails.gender}</span></p>
                                <p className='text-gray-700'>examination number:<span className='text-blue-900'>{resultDetails.firstname}</span></p>
                                <p className='text-gray-700'>seat number:<span className='text-blue-900'>{resultDetails.firstname}</span></p>
                                <p className='text-gray-700'>Total questions:<span className='text-blue-900'>{resultDetails.firstname}</span></p>
                                <p className='text-gray-700'>attempted questions:<span className='text-blue-900'>{resultDetails.firstname}</span></p>
                            </>
                        ) : (
                            <>
                                <p className='text-gray-700 ms-5 font-semibold'>examiner:<span className='ms-5 text-lg font-bold text-blue-900'>{resultDetails.examiner}</span></p>
                                <p className='text-gray-700 ms-5 font-semibold'>candidate name:<span className='ms-5 text-lg font-bold text-blue-900'>{resultDetails.candidateName}</span></p>
                                <p className='text-gray-700 ms-5 font-semibold'>candidate number:<span className='ms-5 text-lg font-bold text-blue-900'>{resultDetails.candidateNo}</span></p>
                                <p className='text-gray-700 ms-5 font-semibold'>gender:<span className='ms-5 text-lg font-bold text-blue-900'>{resultDetails.gender}</span></p>
                                <p className='text-gray-700 ms-5 font-semibold'>score:<span className='ms-5 text-lg font-bold text-blue-900'>{resultDetails.score}</span></p>
                            </>
                        )}
                    </div>
                    <div className='w-4/12'>
                        <img src={logo} alt="" className='h-56' />
                    </div>
                </div>
            </main>
            <footer className='bg-gray-200 h-30 w-full'></footer>
        </div>
        </div>

    );
}

export default ViewResult;