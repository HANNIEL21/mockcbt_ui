import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseApiUrl } from '../../utils/constants';
import Alert from '../../components/Alert';
import { useDispatch } from 'react-redux';
import { setUserDetails } from "../../redux/Features/User";


const AddToken = ({ closeModal, user }) => {

    const [token, setToken] = useState(new Array(6).fill(''))
    const dispatch = useDispatch();

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            token: token.join('',),
        }));
    }, [token]);

    const [formData, setFormData] = useState({
        token: token,
        user: user,
        status: 'USED',
    });
    console.log(formData, "formdata");

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setToken([...token.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

   function handleBackspace (index) {
        return (e) => {
            if (e.key === 'Backspace') {
                if (index > 0) {
                    e.target.previousSibling.focus();
                }
            }
        }

   }



    const save = async () => {
        try {
            console.log(formData);
            // Save the token
            const res = await axios.put(`${baseApiUrl}/token.php?id=${formData.token}`, formData);
            // debugger;
            // console.log(res)
            // if (res.status !== 200)  {
            //     console.log("I RAN")
            //     Alert(res.data.status, res.data.message);
            //     console.error('Failed to save token:', res.statusText);
            //     closeModal();
            //     return
            // }

                Alert(res.data.status, res.data.message);
                const response = await axios.post(`${baseApiUrl}/login.php`, { username: user });
                dispatch(setUserDetails(response.data));
                closeModal();
            
        } catch (error) {
            
            console.error('An error occurred while saving token', error);
            Alert('error' , error.response?.data?.message || error.message || 'An error occurred while saving token');
            closeModal();
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Add Token</h3>
                        <form action="" className='w-full flex flex-col gap-3 py-5'>
                            <div className="flex justify-center items-center gap-3">
                                {token.map((data, index) => (
                                    <input
                                        autoFocus={index === 0}
                                        key={index}
                                        type="text"
                                        className="border-2 w-12 text-center h-12 border-[#8F1E63] text-[#8F1E63] p-2 rounded-lg focus:outline-none"
                                        maxLength="1"
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => e.target.select()}
                                        onKeyDown={handleBackspace(index)}
                                    />
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Enter
                </button>
                <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-red-300 hover:bg-red-400 text-red-700 text-base font-medium focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddToken;
