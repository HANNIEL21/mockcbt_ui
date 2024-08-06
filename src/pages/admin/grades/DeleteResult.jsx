import React from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { baseApiUrl } from '../../../utils/constants';
import Alert from '../../../components/Alert';

const DeleteResult = ({ closeDeleteResultModal, rId }) => {

    const handleDelete = async (id) => {
        try {
            console.log(id);
            // Send a DELETE request to your backend endpoint with the user ID
            const response = await axios.delete(`${baseApiUrl}/result.php?id=${id}`);
            if (response.status === 200) {
                // User deleted successfully
                if (response.data.status === "success") {
                    Alert("success", "Delete successful");
                }
            } else {
                // Failed to delete user
                Alert("error", "Failed to delete result");
                console.error('Failed to delete result:', response.statusText);
            }
        } catch (error) {
            // An error occurred while deleting user
            Alert("error", "An error occurred while deleting result");
            console.error('An error occurred while deleting result:', error.message);
        } finally {
            // Close the delete user modal regardless of the outcome
            closeDeleteResultModal();
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdDelete className='text-red-500 text-sm' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Delete Result</h3>

                        <div className="flex items-center justify-center text-base my-5">
                            <p>Are you sure you want to delete this result?</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => handleDelete(rId)} className="mt-3 ms-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-300 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Delete
                </button>

                <button type="button" onClick={closeDeleteResultModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>

            </div>
        </div>
    )
}

export default DeleteResult;
