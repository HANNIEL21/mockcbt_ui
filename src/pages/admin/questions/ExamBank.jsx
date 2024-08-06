import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from '../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import EditQuestion from './EditQuestion';
import DeleteQuestion from './DeleteQuestion';
import AddQuestion from './AddQuestion';
import ImportQuestion from './ImportQuestion';


import { setQuestions, isLoadingFalse, isLoadingTrue } from '../../../redux/Features/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { baseApiUrl } from '../../../utils/constants';


const ExamBank = () => {
  const dispatch = useDispatch();
  const { questions, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(false);
  const [isOpenImportQuestionModal, setIsOpenImportQuestionModal] = useState(false);
  const [isOpenEditQuestionModal, setIsOpenEditQuestionModal] = useState(false);
  const [isOpenDeleteQuestionModal, setIsOpenDeleteQuestionModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);


  console.log(questions);

  useEffect(() => {
    dispatch(isLoadingTrue());


    const getQuestions = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/question.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve users:', response.statusText);
        } else {
          dispatch(setQuestions(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving users:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 500);
      }
    };
    getQuestions();
  }, [dispatch]);

  const openModal = (modalName, qId) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddQuestionModal(true);
        break;
      case 'import':
        setIsOpenImportQuestionModal(true);
        break;
      case 'edit':
        setSelectedQuestionId(qId);
        setIsOpenEditQuestionModal(true);
        break;
      case 'delete':
        setSelectedQuestionId(qId);
        setIsOpenDeleteQuestionModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddQuestionModal(false);
        break;
      case 'import':
        setIsOpenImportQuestionModal(false);
        break;
      case 'edit':
        setIsOpenEditQuestionModal(false);
        break;
      case 'delete':
        setIsOpenDeleteQuestionModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const columns = [
    {
      name: 'ID',
      width:  "60px",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'COURSE',
      width: "170px",
      selector: row => row.course,
      sortable: true,
    },
    {
      name: 'QUESTION',
      width: "170px",
      selector: row => row.question,
      sortable: true,
    },
    {
      name: 'ANSWER',
      width: "150px",
      selector: row => row.answer,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      width: "170px",
      selector: row => row.category,
    },
    {
      name: 'TYPE',
      width: "100px",
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      cell: row => <div className='flex gap-4'>
        <>
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />

          </button>

          {isOpenEditQuestionModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditQuestion closeEditQuestionModal={() => closeModal("edit")} qId={selectedQuestionId} />
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

          {isOpenDeleteQuestionModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteQuestion closeDeleteQuestionModal={() => closeModal("delete")} qId={selectedQuestionId} />
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
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Loader duration={3000} />
        </div>
      ) : (
        <>
          <Table
            label={columns}
            data={questions}
            del={"question"} 
            isLoading={isLoading}
            filter={"category"}
            children={
              <div className="flex items-center gap-3">
                <>
                  <button
                    onClick={() => openModal("add")}
                    className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                  >
                    <MdAdd className='' /> <p>Add Question</p>
                  </button>

                  {isOpenAddQuestionModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <AddQuestion closeAddQuestionModal={() => closeModal("add")} />
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
                    <MdImportExport className='' /> <p>Import Questions</p>
                  </button>

                  {isOpenImportQuestionModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <ImportQuestion closeImportQuestionModal={() => closeModal("import")} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            }
          />
        </>
      )}
    </div>

  )
}

export default ExamBank