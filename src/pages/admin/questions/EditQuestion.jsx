import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { subjects, types, categories } from '../../../engine_config';
import { baseApiUrl } from '../../../utils/constants';
import Alert from '../../../components/Alert';

const EditQuestion = ({ qId, closeEditQuestionModal }) => {
    const [formData, setFormData] = useState({
        question: '',
        course: '',
        mark: '',
        opt1: '',
        opt2: '',
        opt3: '',
        opt4: '',
        answer: '',
        type: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching question for qId:', qId);
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseApiUrl}/question.php?id=${qId}`);
                if (response.status === 200) {
                    const questionData = response.data;
                    setFormData(questionData);
                } else {
                    Alert("error", "Failed to fetch question data");
                    setError('Failed to fetch question data');
                }
            } catch (error) {
                console.log(error);
                Alert("error", "An error occurred while fetching question data");
                setError('An error occurred while fetching question data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [qId]); // Run whenever qId changes

    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = async (id) => {

        try {
            setLoading(true);
            setError(null);
            const response = await axios.put(`${baseApiUrl}/question.php?id=${id}`, formData);
            console.log(response);
            if (response.status === 200) {
                // User updated successfully
                if (response.data.status === "success") {
                    Alert("success", "Question update was successful");
                }
                closeEditQuestionModal();
            } else {
                setError('Failed to update question');
                Alert("error", "Failed to update question");
            }
        } catch (error) {
            setError('An error occurred while updating question');
            Alert("error", "An error occurred while updating question");
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Edit Question</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <textarea
                                    name="question"
                                    id="question"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Question"
                                    value={formData.question}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="answer"
                                    id="answer"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Answer"
                                    value={formData.answer}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt1"
                                    id="opt1"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt1"
                                    value={formData.opt1}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt2"
                                    id="opt2"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt2"
                                    value={formData.opt2}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt3"
                                    id="opt3"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt3"
                                    value={formData.opt3}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt4"
                                    id="opt4"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt4"
                                    value={formData.opt4}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="mark"
                                    id="mark"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Mark"
                                    value={formData.mark}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="examtype" className="sr-only">Course </label>
                                <select
                                    name="course"
                                    id="course"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.course}
                                >
                                    <option value="">Course</option>
                                    {subjects.map((item, i) => (
                                        <option
                                            key={i}
                                            value={item}
                                            defaultValue={formData.course === item}
                                        >{item}</option>))}
                                </select>
                            </div>

                            <div className="w-full">
                                <label htmlFor="category" className="sr-only">Exam Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="shadow-sm focus:border-blue-500 block w-full text-gray-400 sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.category}
                                >
                                    <option value="">Exam Category</option>
                                    {categories.map((category, i) => (
                                        <option
                                            key={i}
                                            value={category}
                                            defaultValue={formData.category === category}
                                        >{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="type" className="sr-only">Question Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    className="shadow-sm focus:border-blue-500 block w-full text-gray-400 sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.type}
                                >
                                    <option value="">Exam Type</option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type} selected={formData.type === type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => save(qId)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditQuestionModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditQuestion;

