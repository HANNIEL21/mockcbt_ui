import React from 'react';
import axios from "axios";
import { FaFileCsv } from "react-icons/fa6";
import { read, utils } from 'xlsx';
import { baseApiUrl } from '../../../utils/constants';
import Alert from '../../../components/Alert';
import { useSelector } from 'react-redux';

const ImportUser = ({ closeImportUserModal }) => {
    const { userDetails } = useSelector((state) => state.user);

    const handleImport = (event) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(event.target.files[0]);
        reader.onload = async (event) => {
            const data = event.target.result;
            const workbook = read(data, {
                type: "array"
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = utils.sheet_to_json(worksheet);

            try {
                // Use Promise.all() to perform all axios POST requests concurrently
                const promises = json.map(async (question) => {
                    const res = await axios.post(`${baseApiUrl}/user.php`, question);
                    console.log(res);
                });
                await Promise.all(promises);
                Alert("success", `All ${json.length} users imported successfully`);
                try {
                    const log = {
                        user: userDetails?.username,
                        event: "Import User"
                    }
                    const event = await axios.post(`${baseApiUrl}/log.php`, log);
                    console.log(event.data);
                } catch (error) {
                    console.log(error.message);
                }
                closeImportUserModal();
            } catch (error) {
                console.log("Error importing candidates:", error);
                closeImportUserModal();
            }
        };
    };


    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaFileCsv className='text-green-500 text-sm' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Import Users</h3>

                        <div className="flex items-center justify-center">
                            <label htmlFor="fileInput" className="w-full flex items-center justify-center py-2 text-sm mt-4 border-2 border-green-700 text-green-700 rounded-md cursor-pointer hover:bg-green-500">
                                <FaFileCsv className='text-green-700 text-sm me-2' />  CSV
                                <input
                                    type="file"
                                    accept='.xlsx, .xls, .csv'
                                    name="fileInput"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleImport}
                                />
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                <button type="button" onClick={closeImportUserModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-300 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ImportUser