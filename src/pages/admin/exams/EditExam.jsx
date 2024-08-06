import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { groups, types, subjects, categories } from "../../../engine_config";
import { baseApiUrl } from '../../../utils/constants';
import { useSelector } from 'react-redux';
import Alert from '../../../components/Alert';

const EditExam = ({ examId, closeEditExamModal }) => {
    const { users } = useSelector((state) => state.dashboard);


    console.log(users);

    const [formData, setFormData] = useState({
        exam: '',
        title: 'EXAMINER',
        category: '',
        questions: '',
        duration: '',
        start: '',
        end: '',
        type: '',
        group: '',
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
    }, [examId]); // Run whenever examId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveExam = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.put(`${baseApiUrl}/exam.php?id=${id}`, formData);
            if (response.status === 200) {
                if (response.data.status === "success") {
                    Alert("success", "Exam updated successfully");
                }
                closeEditExamModal();
            } else {
                Alert("error", "Failed to update Exam");
                setError('Failed to update Exam');
            }
        } catch (error) {
            Alert("error", 'An error occurred while updating Exam');
            setError('An error occurred while updating Exam');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdEdit className='text-green-500 text-sm' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Edit Exam</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="exam"
                                    id="exam"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Name"
                                    value={formData.exam}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="number"
                                    name="questions"
                                    id="question"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Number of Questions"
                                    value={formData.questions}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="group" className="sr-only">Exam Group</label>
                                <select
                                    name="group"
                                    id="group"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.group}
                                >
                                    <option value="">Exam Group</option>
                                    {groups.map((group, index) => (
                                        <option key={index} value={group} selected={formData.group === group}>{group}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="group" className="sr-only">CATEGORY</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.category}
                                >
                                    <option value="">CATEGORY</option>
                                    {categories.map((item, index) => (
                                        <option key={index} value={item} selected={formData.item === item}>{item}</option>
                                    ))}
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
                <button type="button" onClick={() => saveExam(examId)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditExamModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditExam;
