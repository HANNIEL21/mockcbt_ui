import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';

const EditFeedback = ({ id, closeEditModal }) => {



    const [formData, setFormData] = useState({
        user: '',
        rate: '',
        feedback: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExamData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseApiUrl}/feedback.php?id=${id}`);
                if (response.status === 200) {
                    const examData = response.data;
                    setFormData(examData);

                    console.log(examData);
                } else {
                    setError('Failed to fetch exam data');
                }
            } catch (error) {
                setError('An error occurred while fetching exam data');
            } finally {
                setLoading(false);
            }
        };

        fetchExamData();
    }, [id]); // Run whenever examId changes

    console.log(formData);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdEdit className='text-green-500 text-sm' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Candidate Feedback</h3>
                        <form className="grid grid-cols-1 gap-4 mt-3">
                            <div className='flex w-full gap-2'>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="user"
                                        id="user"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="USER"
                                        value={formData.user}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="rate"
                                        id="rate"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="RATE"
                                        value={formData.rate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <textarea
                                name="feedback"
                                id="feedback"
                                placeholder='Feedback'
                                className='p-3 border-2 border-gray-300 rounded-md'
                                value={formData.feedback}
                            ></textarea>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={closeEditModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Loading...' : 'Close'}
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditFeedback;
