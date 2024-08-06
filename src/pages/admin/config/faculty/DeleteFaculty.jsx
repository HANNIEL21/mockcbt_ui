import React from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { baseApiUrl } from '../../../../utils/constants';

const DeleteFaculty = ({ closeDeleteFacultyModal, Id }) => {

    const handleDelete = async (id) => {
        try {
            console.log(id);
            // Send a DELETE request to your backend endpoint with the user ID
            const response = await axios.delete(`${baseApiUrl}/faculty.php?id=${id}`);
            if (response.status === 200) {
                // Faculty deleted successfully
                console.log(response.data);
            } else {
                // Failed to delete Faculty
                console.error('Failed to delete Faculty:', response.statusText);
            }
        } catch (error) {
            // An error occurred while deleting Faculty
            console.error('An error occurred while deleting Faculty:', error.message);
        } finally {
            // Close the delete Faculty modal regardless of the outcome
            closeDeleteFacultyModal();
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Delete Faculty</h3>

                        <div className="flex items-center justify-center text-base my-5">
                            <p>Are you sure you want to delete this faculty?</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => handleDelete(Id)} className="mt-3 ms-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-300 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Delete
                </button>

                <button type="button" onClick={closeDeleteFacultyModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>

            </div>
        </div>
    )
}

export default DeleteFaculty;
