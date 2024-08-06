import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';
import { groups, gender } from '../../../engine_config';
import Alert from '../../../components/Alert';

const EditCandidate = ({ userId, closeEditCandidateModal }) => {
    const [formData, setFormData] = useState({
        course: "",
        s1: "",
        s2: "",
        s3: "",
        s4: "",
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
                    console.log();

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

    }, [userId]); // Run whenever userId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveCandidate = async (id) => {
        console.log(id);

        try {
            setLoading(true);
            setError(null);
            const response = await axios.put(`${baseApiUrl}/candidate.php?id=${id}`, formData);
            if (response.status === 200) {
                // User updated successfully
                if (response.data.status === "success") {
                    Alert("success", "Candidate update was successful");
                }
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


    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                    <div className='flex gap-5'>
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <MdEdit className='text-green-500 text-sm' />
                        </div>
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Candidate</h3>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                        {/* <div className=''>
                            <img src={`${baseApiUrl}/images/${formData?.avatar}`} className='h-20' alt="User Avatar" />
                        </div> */}
                        <form className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="User Name"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="First Name"
                                    value={formData.firstname}
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
                                    value={formData.lastname}
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
                                    value={formData.examno}
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
                                    value={formData.gender}
                                >
                                    <option value="">GENDER</option>
                                    {gender.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="course"
                                    id="course"
                                    className="border-2 f focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Candidate Course"
                                    value={formData.course}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="tel"
                                    name="s1"
                                    id="s1"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="SUBJECT 1"
                                    value={formData.s1}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="s2"
                                    id="s2"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="SUBJECT 2"
                                    value={formData.s2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="s3"
                                    id="s3"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="SUBJECT 3"
                                    value={formData.s3}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="s4"
                                    id="s4"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="SUBJECT 4"
                                    value={formData.s4}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="group" className="sr-only">GROUP</label>
                                <select
                                    name="group"
                                    id="group"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={formData.group}
                                >
                                    <option value="">GROUP</option>
                                    {groups.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                </select>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => saveCandidate(userId)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditCandidateModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditCandidate;

