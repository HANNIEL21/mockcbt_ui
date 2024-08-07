import React, { useState } from "react";
import axios from "axios";
import { MdOutlineAdd } from "react-icons/md";
import { baseApiUrl } from "../../../utils/constants";
import { categories, subjects, types } from "../../../engine_config";
import Token from "./Token";
import Alert from "../../../components/Alert";
import generateToken from "../../../utils/generateToken";

const maxTokenLength = 1000;
const GenerateToken = ({ closeGenerateModal }) => {
  const [numTokens, setNumTokens] = useState(1);
  const [formData, setFormData] = useState({
    token: "",
    status: "UNUSED",
  });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };

  function handleChange(e) {
    if (e.target.value > maxTokenLength) return;
    setNumTokens(e.target.value);
  }

  async function generate() {
    try {
      const tokens = generateToken(8, numTokens);

      const tokenPromise = tokens.map((token) =>
        axios.post(`${baseApiUrl}/token.php`, { token, status: "UNUSED" })
      );

      await Promise.all(tokenPromise);

      Alert("success", `${numTokens} tokens generated successfully`);
      closeGenerateModal();
    } catch (error) {
      Alert(
        "error",
        error.response?.data?.message ||
          error.message ||
          "An error occurred while generating tokens"
      );
      console.error("Error generating tokens:", error);
      closeGenerateModal();
    }
  }

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
              Generate Tokens
            </h3>
            <form className="w-full grid grid-cols-1 gap-4 mt-3">
              <div className="w-full flex gap-3">
                <input
                  max={9999}
                  value={numTokens}
                  type="number"
                  name="numTokens"
                  id="numTokens"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="NUMBER OF TOKENS"
                  onChange={handleChange}
                />
                <button
                  onClick={() => setNumTokens(maxTokenLength)}
                  type="button"
                  className="px-3 py-2 hover:bg-blue-300 transition-colors text-blue-700 border rounded-md bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Max
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={generate}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Generate And Save
        </button>
        <button
          type="button"
          onClick={closeGenerateModal}
          className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white hover:bg-gray-200 text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GenerateToken;
