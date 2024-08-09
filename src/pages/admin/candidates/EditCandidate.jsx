import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';
import { groups, gender } from '../../../engine_config';
import Alert from '../../../components/Alert';
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const EditCandidate = ({ userId, closeEditCandidateModal }) => {
    const [formData, setFormData] = useState({
        status: "",
        username: '',
        firstname: '',
        lastname: '',
        gender: '',
        group: '',
        examno: '',
        avatar: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${baseApiUrl}/candidate.php?id=${userId}`);
                if (response.status === 200) {
                    const userData = response.data;
                    setFormData(userData);
                    console.log(userData);
                } else {
                    Alert("error", "Failed to fetch user data");
                    setError('Failed to fetch user data');
                }
            } catch (error) {
                Alert("error", "An error occurred while fetching user data");
                setError('An error occurred while fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveCandidate = async (id) => {
        console.log(formData);
        try {
            setLoading(true);
            setError(null);
            const response = await axios.put(`${baseApiUrl}/candidate.php?id=${id}`, formData);
            if (response.status === 200 && response.data.status === "success") {
                Alert("success", "Candidate update was successful");
                closeEditCandidateModal();
            } else {
                Alert("error", "Failed to update candidate");
                setError('Failed to update candidate');
            }
        } catch (error) {
            Alert("error", "An error occurred while updating candidate");
            setError('An error occurred while updating candidate');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = () => {
        setFormData(prevState => ({
            ...prevState,
            status: prevState.status === "INACTIVE" ? "ACTIVE" : "INACTIVE"
        }));
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                    <div className='flex gap-5'>
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <MdEdit className='text-green-500 text-md' />
                        </div>
                        <div className='w-full flex justify-between'>
                            <h3 className="text-lg mt-2 leading-6 text-green-500 font-extrabold uppercase" id="modal-title">Edit Candidate</h3>
                            <button className='shadow-md px-2 rounded-md' onClick={handleStatusUpdate}>
                                {formData?.status === "INACTIVE" ? (
                                    <FaToggleOff className='text-3xl text-red-500' />
                                ) : (
                                    <FaToggleOn className='text-3xl text-green-500' />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <form className="grid grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <label htmlFor="username" className='uppercase font-extrabold mb-2 text-blue-900'>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="examno" className='uppercase font-extrabold mb-2 text-blue-900'>Exam Number</label>
                                <input
                                    type="text"
                                    name="examno"
                                    id="examno"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Exam Number"
                                    value={formData.examno}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="firstname" className='uppercase font-extrabold mb-2 text-blue-900'>First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastname" className='uppercase font-extrabold mb-2 text-blue-900'>Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="gender" className='uppercase font-extrabold mb-2 text-blue-900'>Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="shadow-md focus:border-blue-500 block w-full sm:text-sm border-gray-300 p-2 rounded-md"
                                    onChange={handleChange}
                                    value={formData.gender}
                                >
                                    <option value="">Select Gender</option>
                                    {gender.map((item, i) => (
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="group" className='uppercase font-extrabold mb-2 text-blue-900'>Group</label>
                                <select
                                    name="group"
                                    id="group"
                                    className="shadow-md focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.group}
                                >
                                    <option value="">Select Group</option>
                                    {groups.map((item, i) => (
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => saveCandidate(userId)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditCandidateModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default EditCandidate;
