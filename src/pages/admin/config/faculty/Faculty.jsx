import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from '../../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { baseApiUrl } from '../../../../utils/constants';
import Loader from '../../../../components/Loader';
import { setFaculties, clearState, isLoadingFalse, isLoadingTrue } from '../../../../redux/Features/Dashboard';
import AddFaculty from './AddFaculty';
import ImportFaculty from './ImportFaculty';
import EditFaculty from './EditFaculty';
import DeleteFaculty from './DeleteFaculty';

const Faculty = () => {
  const dispatch = useDispatch();
  const { faculties, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddFacultyModal, setIsOpenAddFacultyModal] = useState(false);
  const [isOpenImportFacultyModal, setIsOpenImportFacultyModal] = useState(false);
  const [isOpenEditFacultyModal, setIsOpenEditFacultyModal] = useState(false);
  const [isOpenDeleteFacultyModal, setIsOpenDeleteFacultyModal] = useState(false);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    dispatch(isLoadingTrue());
    dispatch(clearState());

    const getAllFaculties = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/faculty.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve faculties:', response.statusText);
        } else {
          dispatch(setFaculties(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving faculties:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 2000);
      }
    };
    getAllFaculties();
  }, [dispatch]);

  console.log(faculties);


  const openModal = (modalName, Id) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddFacultyModal(true);
        break;
      case 'import':
        setIsOpenImportFacultyModal(true);
        break;
      case 'edit':
        setFacultyId(Id);
        setIsOpenEditFacultyModal(true);
        break;
      case 'delete':
        setFacultyId(Id);
        setIsOpenDeleteFacultyModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddFacultyModal(false);
        break;
      case 'import':
        setIsOpenImportFacultyModal(false);
        break;
      case 'edit':
        setIsOpenEditFacultyModal(false);
        break;
      case 'delete':
        setIsOpenDeleteFacultyModal(false);
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
      name: 'FACULTY',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'CREATED',
      selector: row => row.created_at,
      sortable: true,
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

          {isOpenEditFacultyModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditFaculty closeEditFacultyModal={() => closeModal("edit")} Id={facultyId} />
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

          {isOpenDeleteFacultyModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteFaculty closeDeleteFacultyModal={() => closeModal("delete")} Id={facultyId} />
                </div>
              </div>
            </div>
          )}
        </>
      </div>,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Loader duration={3000} />
        </div>
      ) : (
        <>
          <Table
            label={columns} 
            data={faculties}
            filter={"title"}
            children={
              <div className="flex items-center gap-3">
                <>
                  <button
                    onClick={() => openModal("add")}
                    className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                  >
                    <MdAdd className='' /> <p>Add Faculty</p>
                  </button>

                  {isOpenAddFacultyModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <AddFaculty closeAddFacultyModal={() => closeModal("add")} />
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
                    <MdImportExport className='' /> <p>Import Faculty</p>
                  </button>

                  {isOpenImportFacultyModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <ImportFaculty closeImportFacultyModal={() => closeModal("import")} />
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

export default Faculty