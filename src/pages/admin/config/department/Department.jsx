import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from '../../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { baseApiUrl } from '../../../../utils/constants';
import Loader from '../../../../components/Loader';
import { setDepartments, clearState, isLoadingFalse, isLoadingTrue } from '../../../../redux/Features/Dashboard';
import AddDepartment from './AddDepartment';
import DeleteDepartment from './DeleteDepartment';
import EditDepartment from './EditDepartment';
import ImportDepartment from './ImportDepartment';


const Department
 = () => {
  const dispatch = useDispatch();
  const { departments, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [departmentId, setDepartmentId] = useState(null);

  useEffect(() => {
    dispatch(isLoadingTrue());
    dispatch(clearState());

    const getAllFaculties = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/department.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve departments:', response.statusText);
        } else {
          dispatch(setDepartments(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving departments:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 2000);
      }
    };
    getAllFaculties();
  }, [dispatch]);


  const openModal = (modalName, userId) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(true);
        break;
      case 'import':
        setIsOpenImportModal(true);
        break;
      case 'edit':
        setDepartmentId(userId);
        setIsOpenEditModal(true);
        break;
      case 'delete':
        setDepartmentId(userId);
        setIsOpenDeleteModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(false);
        break;
      case 'import':
        setIsOpenImportModal(false);
        break;
      case 'edit':
        setIsOpenEditModal(false);
        break;
      case 'delete':
        setIsOpenDeleteModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.faculty_id,
      sortable: true,
    },
    {
      name: 'FACULTY',
      selector: row => row.faculty_title,
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
            onClick={() => openModal("edit", row.faculty_id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />

          </button>

          {isOpenEditModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditDepartment closeEditModal={() => closeModal("edit")} id={departmentId} />
                </div>
              </div>
            </div>
          )}
        </>
        <>
          <button
            onClick={() => openModal("delete", row.faculty_id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>

          {isOpenDeleteModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteDepartment closeDeleteModal={() => closeModal("delete")} id={departmentId} />
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
            data={departments}
            filter={"firstname"}
            children={
              <div className="flex items-center gap-3">
                <>
                  <button
                    onClick={() => openModal("add")}
                    className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                  >
                    <MdAdd className='' /> <p>Add Department</p>
                  </button>

                  {isOpenAddModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <AddDepartment closeAddModal={() => closeModal("add")} />
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
                    <MdImportExport className='' /> <p>Import Departments</p>
                  </button>

                  {isOpenImportModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <ImportDepartment closeImportModal={() => closeModal("import")} />
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

export default Department
