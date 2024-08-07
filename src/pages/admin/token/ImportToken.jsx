import React, { useState } from 'react';
import { FaFileCsv } from "react-icons/fa6";
import { read, utils } from 'xlsx';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { baseApiUrl } from '../../../utils/constants';
import Alert from '../../../components/Alert';
import { setTokens } from '../../../redux/Features/Dashboard';

const ImportToken = ({ closeImportModal }) => {
    const dispatch = useDispatch();
    const [number, setNumber] = useState(0);



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
                const promises = json.map(async (token) => {
                    const res = await axios.post(`${baseApiUrl}/token.php`, token);
                    console.log(res);
                });
                await Promise.all(promises);
                Alert("success", `All ${json.length} tokens imported successfully`);
                closeImportModal();
            } catch (error) {
                console.log("Error importing candidates:", error);
                closeImportModal();
            }
        };
    };

    const handleGenerate = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 8;

        for (let i = 0; i < number; i++) {
            let result = '';
            for (let j = 0; j < length; j++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            try {
                const res = await axios.post(`${baseApiUrl}/token.php`, { token: result });
                Alert(res.data.status, res.data.message);
                console.log(`Posted token ${result} with response:`, res.data);
            } catch (error) {
                console.error(`Error posting token ${result}:`, error);
            }
        }
    }


    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaFileCsv className='text-green-500 text-sm' />
                    </div>
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Import Tokens</h3>

                        <div className="flex items-center gap-2 my-4  w-full">
                            <div className='flex items-center gap-2 w-3/4'>
                                <input
                                    type="text"
                                    placeholder='Enter Number Of Tokens'
                                    autoFocus
                                    className='w-[80%] bg-transparent placeholder:text-base placeholder:font-normal border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold text-blue-900 shadow-md'
                                    onChange={(e) => {
                                        setNumber(e.target.value);
                                    }}
                                />
                                <button onClick={handleGenerate} className='text-sm border-2 border-blue-900 text-blue-900 font-bold uppercase p-2 rounded-md'>Generate</button>
                            </div>
                            <label htmlFor="fileInput" className="w-16 flex items-center justify-center py-2 text-sm border-2 border-green-700 text-green-700 rounded-md cursor-pointer hover:bg-green-500">
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

                <button type="button" onClick={closeImportModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ImportToken