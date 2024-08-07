import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { subjects, types, categories, status } from "../../../engine_config";
import { baseApiUrl } from "../../../utils/constants";
import Alert from "../../../components/Alert";

const EditToken = ({ id, closeEditTokenModal }) => {
  const [formData, setFormData] = useState({
    status: "",
    token: "",
    user: "",
    expires_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching question for qId:", id);
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseApiUrl}/token.php?id=${id}`);
        if (response.status === 200) {
          const questionData = response.data;
          setFormData(questionData);
        } else {
          Alert("error", "Failed to fetch question data");
          setError("Failed to fetch question data");
        }
      } catch (error) {
        console.log(error);
        Alert("error", "An error occurred while fetching question data");
        setError("An error occurred while fetching question data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); // Run whenever qId changes

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const save = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${baseApiUrl}/token.php?id=${id}`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        // User updated successfully
        if (response.data.status === "success") {
          Alert("success", "Token update was successful");
        }
        closeEditTokenModal();
      } else {
        setError("Failed to update Token");
        Alert("error", "Failed to update Token");
      }
    } catch (error) {
      setError("An error occurred while updating Token");
      Alert("error", "An error occurred while updating Token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <MdEdit className="text-green-500 text-sm" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg mt-2 leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Edit Token
            </h3>
            <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
              <div className="w-full">
                <input
                  type="text"
                  name="token"
                  id="token"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Token"
                  value={formData.token}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="status"
                  id="status"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="user"
                  id="user"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="User"
                  value={formData.user}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="expires"
                  id="expires"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Expires"
                  value={formData.expires_at}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => save(id)}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={closeEditTokenModal}
          className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default EditToken;
