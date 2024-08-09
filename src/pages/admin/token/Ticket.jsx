import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { baseApiUrl } from "../../../utils/constants";
import Alert from "../../../components/Alert";
import { FaTicket } from "react-icons/fa6";

const Ticket = ({ closeTicketModal, id, token }) => {

  const handleDelete = async (id) => {
    try {
      console.log(id);
      // Send a DELETE request to your backend endpoint with the user ID
      const response = await axios.delete(`${baseApiUrl}/token.php?id=${id}`);
      // User deleted successfully
      Alert("success", response?.data?.message || "Token deleted successfully");
      console.log(response);
    } catch (error) {
      // An error occurred while deleting user
      Alert(
        "error",
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while deleting token"
      );
      console.error("An error occurred while deleting user:", error.message);
    } finally {
      // Close the delete user modal regardless of the outcome
      closeTicketModal();
    }
  };

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <FaTicket className="text-blue-500 text-sm" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg mt-2 leading-6 font-extrabold text-blue-500"
              id="modal-title"
            >
              TICKET
            </h3>

            <div className="flex flex-col items-start justify-center text-base my-5">
              <p className="font-extrabold text-2xl uppercase">How to use token?</p>

              <ul className="list-disc list-inside mt-3">
                <li>Login with your reg number</li>
                <li>Click on the Click to enter token button</li>
                <li>Enter the token below</li>
                <li>Logout and login again</li>
                <li>You're all set</li>
              </ul>

              <p className="text-3xl font-extrabold mt-5">{token}</p>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => handleDelete(id)}
          className="mt-3 ms-3 w-full inline-flex justify-center rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-300 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
        >
          Print
        </button>

        <button
          type="button"
          onClick={closeTicketModal}
          className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Ticket;
