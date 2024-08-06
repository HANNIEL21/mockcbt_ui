import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from '../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import AddCandidate from './AddCandidate';
import ImportCandidate from './ImportCandidate';
import DeleteCandidate from './DeleteCandidate';
import EditCandidate from './EditCandidate';

import { useSelector, useDispatch } from "react-redux";
import { setCandidates, isLoadingTrue, isLoadingFalse } from '../../../redux/Features/Dashboard';
import Loader from '../../../components/Loader';
import { baseApiUrl } from '../../../utils/constants';

const Candidate = () => {
  const dispatch = useDispatch();
  const { candidates, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddCandidateModal, setIsOpenAddCandidateModal] = useState(false);
  const [isOpenImportCandidateModal, setIsOpenImportCandidateModal] = useState(false);
  const [isOpenEditCandidateModal, setIsOpenEditCandidateModal] = useState(false);
  const [isOpenDeleteCandidateModal, setIsOpenDeleteCandidateModal] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  useEffect(() => {
    dispatch(isLoadingTrue());

    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/candidate.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve candidates:', response.statusText);
        } else {
          console.log(typeof response.data); // Check the type of response data
          dispatch(setCandidates(response.data)); // Dispatch setCandidates action to update candidates state
        }
      } catch (error) {
        console.error('An error occurred while retrieving candidates:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 500);
      }
    };
    getAllUsers();
  }, [dispatch]);

  const openModal = (modalName, userId) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddCandidateModal(true);
        break;
      case 'import':
        setIsOpenImportCandidateModal(true);
        break;
      case 'edit':
        setSelectedCandidateId(userId);
        setIsOpenEditCandidateModal(true);
        break;
      case 'delete':
        setSelectedCandidateId(userId);
        setIsOpenDeleteCandidateModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddCandidateModal(false);
        break;
      case 'import':
        setIsOpenImportCandidateModal(false);
        break;
      case 'edit':
        setIsOpenEditCandidateModal(false);
        break;
      case 'delete':
        setIsOpenDeleteCandidateModal(false);
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
      name: 'USER NAME',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'EXAM NUMBER',
      selector: row => row.examno,
    },
    {
      name: 'GENDER',
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: 'COURSE',
      selector: row => row.course,
      sortable: true,
    },
    {
      name: 'TOKEN',
      selector: row => row.token,
    },
    {
      name: 'ACTIONS',
      grow: 2,
      cell: row => <div className='flex gap-4'>
        <>
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />
          </button>

          {isOpenEditCandidateModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditCandidate closeEditCandidateModal={() => closeModal("edit")} userId={selectedCandidateId} />
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

          {isOpenDeleteCandidateModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteCandidate closeDeleteCandidateModal={() => closeModal("delete")} userId={selectedCandidateId} />
                </div>
              </div>
            </div>
          )}
        </>
      </div>,
    },
  ];


  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
      {
        isLoading ? (
          <div className='h-full w-full flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (
          <>
            <Table
              title='candidates'
              label={columns}
              data={candidates}
              del={"candidate"}
              showFilter={true}
              filter={"firstname"}
              children={
                <div className="flex items-center gap-3">
                  <>
                    <button
                      onClick={() => openModal("add")}
                      className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                    >
                      <MdAdd className='' /> <p>Add Candidate</p>
                    </button>

                    {isOpenAddCandidateModal && (
                      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <AddCandidate closeAddCandidateModal={() => closeModal("add")} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>

                  <>
                    <button
                      onClick={() => openModal("import")}
                      className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                    >
                      <MdImportExport className='' /> <p>Import Candidates</p>
                    </button>

                    {isOpenImportCandidateModal && (
                      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>

                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <ImportCandidate closeImportCandidateModal={() => closeModal("import")} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              }
            />
          </>
        )
      }

    </div>
  );
}

export default Candidate