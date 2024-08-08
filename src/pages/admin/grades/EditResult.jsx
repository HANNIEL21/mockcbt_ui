import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';

const EditResult = ({ rId, closeEditResultModal }) => {
    const [formData, setFormData] = useState({
        exam: '',
        description: '',
        duration: '',
        start: '',
        end: '',
        percentage: '',
        type: '',
        attempts: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseApiUrl}/result.php?id=${rId}`);
                if (response.status === 200) {
                    const resultData = response.data;
                    setFormData(resultData);
                } else {
                    setError('Failed to fetch result data');
                }
            } catch (error) {
                setError('An error occurred while fetching result data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();

    }, [rId]); // Run whenever userId changes

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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Edit Result</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="exam"
                                    id="exam"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Name"
                                    value={formData.exam}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="attempts"
                                    id="attempts"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Attempts"
                                    value={formData.attempts}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="percentage"
                                    id="percentage"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Percentage"
                                    value={formData.percentage}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="examtype" className="sr-only">Exam Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Exam Type</option>
                                    <option value="Examiner">Examiner</option>
                                    <option value="Questioniar">Questioniare</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <input
                                    type="date"
                                    name="start"
                                    id="start"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Start Time"
                                    value={formData.start}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="date"
                                    name="end"
                                    id="end"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="End Time"
                                    value={formData.end}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => { }} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditResultModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditResult;

