import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFeedback } from 'react-icons/md';
import { baseApiUrl } from '../../utils/constants';
import { useSelector } from 'react-redux';
import Alert from '../../components/Alert';
import { FaFaceAngry, FaFaceFrown, FaFaceMeh, FaFaceSmile, FaFaceGrin } from "react-icons/fa6";

const Feedback = ({ examId, closeModal }) => {
    const { userDetails } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        user: userDetails?.examno || '',
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
                const response = await axios.get(`${baseApiUrl}/exam.php?id=${examId}`);
                if (response.status === 200) {
                    const examData = response.data;
                    setFormData(prevState => ({
                        ...prevState,
                        ...examData,
                    }));
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
    }, [examId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRateChange = (rate) => {
        setFormData(prevState => ({
            ...prevState,
            rate: rate
        }));
    };

    const save = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = {
                user: userDetails?.examno,
                rate: formData.rate,
                feedback: formData.feedback,
            };


            const response = await axios.post(`${baseApiUrl}/feedback.php`, data);

            if (response.status === 200) {
                Alert("success", "Feedback Sent");
                // closeModal();
            } else {
                Alert("error", "Failed to Send Feedback");
                setError('Failed to Send Feedback');
            }
        } catch (error) {
            Alert("error", 'An error occurred while sending feedback');
            setError('An error occurred while sending feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdFeedback className='text-green-500 text-sm' />
                    </div>
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Candidate Feedback</h3>
                        <form className="grid grid-cols-1 gap-4 mt-3">
                            <div className='flex flex-col items-center gap-4'>
                                <p className='uppercase font-bold'>Give us a rating</p>
                                <div className="flex space-x-2">
                                    <FaFaceAngry 
                                        className={`cursor-pointer text-4xl ${formData.rate >= 1 ? 'text-red-500' : 'text-gray-300'}`} 
                                        onClick={() => handleRateChange(1)} 
                                    />
                                    <FaFaceFrown 
                                        className={`cursor-pointer text-4xl ${formData.rate >= 2 ? 'text-orange-500' : 'text-gray-300'}`} 
                                        onClick={() => handleRateChange(2)} 
                                    />
                                    <FaFaceMeh 
                                        className={`cursor-pointer text-4xl ${formData.rate >= 3 ? 'text-yellow-500' : 'text-gray-300'}`} 
                                        onClick={() => handleRateChange(3)} 
                                    />
                                    <FaFaceSmile 
                                        className={`cursor-pointer text-4xl ${formData.rate >= 4 ? 'text-green-400' : 'text-gray-300'}`} 
                                        onClick={() => handleRateChange(4)} 
                                    />
                                    <FaFaceGrin 
                                        className={`cursor-pointer text-4xl ${formData.rate >= 5 ? 'text-green-500' : 'text-gray-300'}`} 
                                        onClick={() => handleRateChange(5)} 
                                    />
                                </div>
                            </div>
                            <textarea
                                name="feedback"
                                id="feedback"
                                placeholder='Feedback'
                                className='p-3 border-2 border-gray-300 rounded-md'
                                value={formData.feedback}
                                onChange={handleChange}
                            ></textarea>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                    type="button" 
                    onClick={save} 
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
                <button 
                    type="button" 
                    onClick={closeModal} 
                    className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default Feedback;
