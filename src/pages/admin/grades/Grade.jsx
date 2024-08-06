import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from '../../../components/Table';
import { MdDelete, MdEdit, MdRemoveRedEye, MdImportExport, MdPrint } from "react-icons/md";
import DeleteResult from './DeleteResult';
import EditResult from './EditResult';
import ViewResult from './ViewResult';

import { setResults, isLoadingFalse, isLoadingTrue } from '../../../redux/Features/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { baseApiUrl } from '../../../utils/constants';

const Grade = () => {
    const dispatch = useDispatch();
    const { results, isLoading } = useSelector((state) => state.dashboard);

    const [isOpenViewResultModal, setIsOpenViewResultModal] = useState(false);
    const [isOpenEditResultModal, setIsOpenEditResultModal] = useState(false);
    const [isOpenDeleteResultModal, setIsOpenDeleteResultModal] = useState(false);
    const [selectedResultId, setSelectedResultId] = useState(null);

    useEffect(() => {
        dispatch(isLoadingTrue());

        const getResults = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/result.php`);
                if (response.status !== 200) {
                    console.error('Failed to retrieve results:', response.statusText);
                } else {
                    console.log(response.data); // Check the type of response data
                    dispatch(setResults(response.data));
                }
            } catch (error) {
                console.error('An error occurred while retrieving results:', error.message);
            } finally {
                setTimeout(() => {
                    dispatch(isLoadingFalse());
                }, 500);
            }
        };

        getResults();

    }, [dispatch]);

    console.log(results);

    const openModal = (modalName, rId) => {
        switch (modalName) {
            case 'edit':
                setSelectedResultId(rId);
                setIsOpenEditResultModal(true);
                break;
            case 'view':
                setSelectedResultId(rId);
                setIsOpenViewResultModal(true);
                break;
            case 'delete':
                setSelectedResultId(rId);
                setIsOpenDeleteResultModal(true);
                break;
            default:
                console.error('Invalid modal name');
        }
    };

    const closeModal = (modalName) => {
        switch (modalName) {
            case 'view':
                setIsOpenViewResultModal(false);
                break;
            case 'edit':
                setIsOpenEditResultModal(false);
                break;
            case 'delete':
                setIsOpenDeleteResultModal(false);
                break;
            default:
                console.error('Invalid modal name');
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'EXAM',
            selector: row => row.exam,
            sortable: true,
        },
        {
            name: 'FIRSTNAME',
            selector: row => row.firstname,
            sortable: true,
        },
        {
            name: 'LASTNAME',
            selector: row => row.lastname,
            sortable: true,
        },
        {
            name: 'EXAM NUMBER',
            selector: row => row.examno,
            sortable: true,
        },
        {
            name: 'ATTEMPTS',
            selector: row => row.attempt,
            sortable: true,
        },
        {
            name: 'SCORE',
            selector: row => row.score,
        },
        {
            name: 'ACTIONS',
            grow: 2,
            cell: row => <div className='flex gap-4'>
                <>
                    <button
                        onClick={() => openModal("edit", row.id)}
                        className="border-2 border-blue-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
                    >
                        <MdRemoveRedEye className='text-xl text-blue-700' />

                    </button>

                    {isOpenEditResultModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
                                    <ViewResult closeViewResultModal={() => closeModal("edit")} rId={selectedResultId} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
                <>
                    <button
                        onClick={() => openModal("delete", row.id)}
                        className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
                    >
                        <MdDelete className='text-xl text-red-700' />
                    </button>

                    {isOpenDeleteResultModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <DeleteResult closeDeleteResultModal={() => closeModal("delete")} rId={selectedResultId} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>,
        },
    ];

    return (
        <div className="h-full p-4">
            {
                isLoading ? (
                    <div className='h-full w-full flex justify-center items-center'>
                        <Loader duration={3000} />
                    </div>
                ) : (
                    <>
                        <Table
                            title={"results"}
                            showFilter={true}
                            label={columns}
                            data={results}
                            del={"result"}
                            filter={"firstname"}
                            children={
                                <div className="flex items-center gap-3">
                                    <button
                                        className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                                    >
                                        <MdPrint className='' /> <p>Print Results</p>
                                    </button>
                                    <button
                                        className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                                    >
                                        <MdImportExport className='' /> <p>Export Results</p>
                                    </button>
                                </div>
                            }
                        />
                    </>
                )
            }

        </div>
    )
}

export default Grade;
