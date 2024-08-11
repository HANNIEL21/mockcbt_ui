import React from 'react';
import { FaFileCsv } from "react-icons/fa6";
import * as XLSX from 'xlsx';
import axios from "axios";
import { baseApiUrl } from '../../../utils/constants';
import Alert from '../../../components/Alert';
import Loader from '../../../components/Loader';


const ImportCandidate = ({ closeImportModal }) => {

    const [loading, setLoading] = React.useState(false);


    const handleImport = (event) => {

        event.preventDefault();
        setLoading(true);


        const reader = new FileReader();
        reader.readAsArrayBuffer(event.target.files[0]);
        reader.onload = async (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            const batchSize = 10; // Set your batch size
            const delayBetweenBatches = 500; // Optional: add a delay between batches (in ms)

            try {
                for (let i = 0; i < json.length; i += batchSize) {
                    const batch = json.slice(i, i + batchSize);
                    const promises = batch.map(async (item) => {
                        const res = await axios.post(`${baseApiUrl}/candidate.php`, item);
                        console.log(res);
                    });

                    await Promise.all(promises);

                    if (delayBetweenBatches) {
                        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
                    }
                }
                Alert("success", `All ${json.length} questions imported successfully`);
                setLoading(false);
                closeImportModal();
            } catch (error) {
                console.error("Error importing questions:", error);
                setLoading(false);
                closeImportModal();
            }
        };
    };


    // const handleExport = () => {
    //     const headings = [["ID", "USERNAME", "FIRSTNAME", "LASTNAME", "EXAM NO", "SEAT NO"]];
    //     const wb = utils.book_new();
    //     const ws = utils.json_to_sheet([]);
    //     utils.sheet_add_aoa(ws, headings);
    //     utils.sheet_add_json(ws, candidates, { origin: "A2", skipHeader: true });
    //     utils.book_append_sheet(wb, ws, "Result");
    //     writeFile(wb, "Result.xlsx");

    // }



    return (
        <div>
            {
                loading ? (
                    <div className='w-full h-[400px] flex items-center justify-center'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FaFileCsv className='text-green-500 text-sm' />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900" id="modal-title">Import Candidates</h3>

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

                            <button type="button" onClick={closeImportModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-300 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                                Cancel Import
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ImportCandidate