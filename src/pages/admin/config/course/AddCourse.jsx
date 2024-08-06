import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseApiUrl } from '../../../../utils/constants';

const AddCourse = ({ closeAddCourseModal }) => {
        const [formData, setFormData] = useState({
            title: '',
            code: '',
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
            const response = await axios.post(`${baseApiUrl}/course.php`, formData);
            console.log(response);
            if (response.status === 200) {
                console.log('Course created successfully');
                closeAddCourseModal();
            } else {
                console.error('Failed to save Course:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while saving Course:', error.message);
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Add Course</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="border-2  focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md uppercase"
                                    placeholder="Course Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    className="border-2  focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md uppercase"
                                    placeholder="Course Code"
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button type="button" onClick={closeAddCourseModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddCourse;
