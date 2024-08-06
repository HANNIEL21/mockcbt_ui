import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';
import { groups, faculty, department, states, role, gender } from '../../../engine_config';

const AddCandidate = ({ closeAddCandidateModal }) => {
    const [formData, setFormData] = useState({
        exam: "",
        firstname: '',
        lastname: '',
        exam: '',
        role: '',
        phone: '',
        gender: '',
        group: '',
        seatno: '',
        examno: '',
        avatar: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveCandidate = async () => {
        try {
            console.log(formData);
            const response = await axios.post(`${baseApiUrl}/candidate.php`, formData);

            if (response.status === 200) {
                console.log('User saved successfully');
                closeAddCandidateModal();
            } else {
                console.error('Failed to save user:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while saving user:', error.message);
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Add Candidate</h3>
                        <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="emexamail"
                                    id="exam"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="seatno"
                                    id="seatno"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Seat Number"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="examno"
                                    id="examno"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Number"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="gender" className="sr-only">GENDER</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm border-gray-300 p-2 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">GENDER</option>
                                    {gender.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="group" className="sr-only">GROUP</label>
                                <select
                                    name="group"
                                    id="group"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">GROUP</option>
                                    {groups.map((item) => (<option value={item}>{item}</option>))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="role" className="sr-only">ROLE</label>
                                <select
                                    name="role"
                                    id="role"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">ROLE</option>
                                    {role.map((item) => (<option value={item}>{item}</option>))}
                                    
                                </select>
                            </div>
                            <div className="w-full">
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Number"
                                    onChange={handleChange}
                                />
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={saveCandidate} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button type="button" onClick={closeAddCandidateModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddCandidate;
