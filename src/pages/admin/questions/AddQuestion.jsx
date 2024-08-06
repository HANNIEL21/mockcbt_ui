import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';
import { categories, subjects, types } from '../../../engine_config';

const AddQuestion = ({ closeAddQuestionModal }) => {
    const [formData, setFormData] = useState({
        question: '',
        course: '',
        mark: '',
        opt1: '',
        opt2: '',
        opt3: '',
        opt4: '',
        opt5: '',
        answer: '',
        type: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = async () => {
        try {
            console.log(formData);
            // Save the question
            const questionResponse = await axios.post(`${baseApiUrl}/question.php`, formData);

            if (questionResponse.status === 200) {
                console.log('Question saved successfully');
                closeAddQuestionModal();
            } else {
                console.error('Failed to save question:', questionResponse.statusText);
            }
        } catch (error) {
            console.error('An error occurred while saving question', error.message);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdOutlineAdd className='text-green-500 text-base' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Add Question</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <textarea
                                    name="question"
                                    id="question"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Question"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="answer"
                                    id="answer"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Answer"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt1"
                                    id="opt1"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt1"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt2"
                                    id="opt2"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt2"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt3"
                                    id="opt3"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt3"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="opt4"
                                    id="opt4"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Opt4"
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
                                >
                                    <option value="">Course</option>
                                    {subjects.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="category" className="sr-only">Exam Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">Question Category</option>
                                    {categories.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="examtype" className="sr-only">Exam Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    className="shadow-sm focus:border-blue-500 block w-full text-gray-400 sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">Question Type</option>
                                    {types.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button type="button" onClick={closeAddQuestionModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddQuestion;
