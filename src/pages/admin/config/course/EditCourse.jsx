import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { baseApiUrl } from '../../../../utils/constants';

const EditCourse = ({ Id, closeEditCourseModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    code: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseApiUrl}/course.php?id=${Id}`);
        if (response.status === 200) {
          const data = response.data;
          setFormData(data);

          console.log(data);
        } else {
          setError('Failed to fetch faculty data');
        }
      } catch (error) {
        setError('An error occurred while fetching faculty data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Id]); // Run whenever examId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const save = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${baseApiUrl}/course.php?id=${id}`, formData);
      if (response.status === 200) {
        console.log('Course updated successfully:', response.data);
        closeEditCourseModal();
      } else {
        setError('Failed to update Course');
      }
    } catch (error) {
      setError('An error occurred while updating Course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <MdEdit className='text-green-500 text-sm' />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Edit Course</h3>
            <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
              <div className="w-full">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Exam Name"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Exam Name"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" onClick={() => save(Id)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={closeEditCourseModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default EditCourse;
