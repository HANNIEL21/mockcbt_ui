import React, { useState } from "react";
import axios from "axios";
import { MdOutlineAdd } from "react-icons/md";
import { baseApiUrl } from "../../../utils/constants";
import { categories, subjects, types } from "../../../engine_config";
import Token from "./Token";
import Alert from "../../../components/Alert";
import generateToken from "../../../utils/generateToken";

const AddToken = ({ closeAddModal }) => {
  const [formData, setFormData] = useState({
    token: "",
    status: "UNUSED",
  });

  const handleChange = (e) => {
    if (e.target.value?.length > 8) return;

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function autoGenerate() {
    const [token] = generateToken();
    setFormData({
      token,
      status: "UNUSED",
    });
  }

  const save = async () => {
    try {
      console.log(formData);
      // Save the token
      const res = await axios.post(`${baseApiUrl}/token.php`, formData);

      Alert(res.data.status, res.data.message);
      console.log(res);
      closeAddModal();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while saving token";
      Alert("error", errorMsg);
      console.error(errorMsg);
      closeAddModal();
    }
  };

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <MdOutlineAdd className="text-green-500 text-base" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3
              className="text-lg mt-2 leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Add Token
            </h3>
            <form className="w-full grid grid-cols-1 gap-4 mt-3">
              <div className="w-full grid grid-cols-[1fr_auto] gap-3">
                <input
                  value={formData.token}
                  name="token"
                  id="token"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="NUMBER OF TOKENS"
                  onChange={handleChange}
                />
                <button
                  onClick={autoGenerate}
                  type="button"
                  className="px-3 py-2 w-max hover:bg-blue-300 transition-colors text-blue-700 border rounded-md bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Auto Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={save}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        <button
          type="button"
          onClick={closeAddModal}
          className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddToken;
