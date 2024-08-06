import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Table';
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import EditExam from './EditExam';
import DeleteExam from './DeleteExam';
import AddExam from './AddExam';



import { setExams, isLoadingFalse, isLoadingTrue } from '../../../redux/Features/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { baseApiUrl } from '../../../utils/constants';

const Exams = () => {
  const dispatch = useDispatch();
  const { exams, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddExamModal, setIsOpenAddExamModal] = useState(false);
  const [isOpenEditExamModal, setIsOpenEditExamModal] = useState(false);
  const [isOpenDeleteExamModal, setIsOpenDeleteExamModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);



  useEffect(() => {
    dispatch(isLoadingTrue());

    const getAllExams = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/exam.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve users:', response.statusText);
        } else {
          dispatch(setExams(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving users:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 500);
      }
    };
    getAllExams();
  }, [dispatch]);


  const openModal = (modalName, examId) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddExamModal(true);
        break;
      case 'edit':
        setSelectedExamId(examId);
        setIsOpenEditExamModal(true);
        break;
      case 'delete':
        setSelectedExamId(examId);
        setIsOpenDeleteExamModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddExamModal(false);
        break;
      case 'edit':
        setIsOpenEditExamModal(false);
        break;
      case 'delete':
        setIsOpenDeleteExamModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const exam = [
    {
      name: 'ID',
      selector: row => row.exam_id,
      sortable: true,
    },
    {
      name: 'EXAM NAME',
      selector: row => row.exam,
      sortable: true,
    },
    {
      name: 'START',
      selector: row => row.start,
      sortable: true,
    },
    {
      name: 'END',
      selector: row => row.end,
    },
    {
      name: 'TYPE',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'GROUP',
      selector: row => row.group,
      sortable: true,
    },
    {
      name: 'NO OF QUESTIONS',
      selector: row => row.questions,
      sortable: true,
    },
    {
      name: 'DURATION',
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      grow: 2,
      cell: row => <div className='flex gap-4'>
        <>
          <button
            onClick={() => openModal("edit", row.exam_id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />

          </button>

          {isOpenEditExamModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditExam closeEditExamModal={() => closeModal("edit")} examId={selectedExamId} />
                </div>
              </div>
            </div>
          )}
        </>
        <>
          <button
            onClick={() => openModal("delete", row.exam_id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>

          {isOpenDeleteExamModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteExam closeDeleteExamModal={() => closeModal("delete")} examId={selectedExamId} />
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
            <Loader  />
          </div>
        ) : (
          <Table
            label={exam}
            data={exams}
            filter={"exam"}
            children={
              <>
                <button
                  onClick={() => openModal("add")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdAdd className='' /> <p>Add Exam</p>
                </button>

                {isOpenAddExamModal && (
                  <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <AddExam closeAddExamModal={() => closeModal("add")} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          />
        )
      }

    </div>
  )
}

export default Exams