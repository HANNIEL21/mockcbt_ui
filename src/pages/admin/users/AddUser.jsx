import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd  } from 'react-icons/md';
import { baseApiUrl } from '../../../utils/constants';

const AddUser = ({ closeAddUserModal }) => {
    const [formData, setFormData] = useState({
        password: '',
        firstname: '',
        lastname: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveUser = async () => {
        try {
            console.log(formData);
            const response = await axios.post(`${baseApiUrl}/user.php`, formData);

            if (response.status === 200) {
                console.log('User saved successfully');
                closeAddUserModal();
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
                        <MdOutlineAdd  className='text-green-500 text-base' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Add User</h3>
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
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="role" className="sr-only">User Group</label>
                                <select
                                    name="role"
                                    id="role"
                                    className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">User Role</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="EXAMINER">EXAMINER</option>
                                    <option value="USER">USER</option>
                                </select>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={saveUser} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button type="button" onClick={closeAddUserModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddUser;
