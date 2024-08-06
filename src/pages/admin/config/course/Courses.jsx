import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from '../../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { baseApiUrl } from '../../../../utils/constants';
import Loader from '../../../../components/Loader';
import { setCourses, clearState, isLoadingFalse, isLoadingTrue } from '../../../../redux/Features/Dashboard';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';
import AddCourse from './AddCourse';
import ImportCourse from './ImportCourse';


const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddCourseModal, setIsOpenAddCourseModal] = useState(false);
  const [isOpenImportCourseModal, setIsOpenImportCourseModal] = useState(false);
  const [isOpenEditCourseModal, setIsOpenEditCourseModal] = useState(false);
  const [isOpenDeleteCourseModal, setIsOpenDeleteCourseModal] = useState(false);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    dispatch(isLoadingTrue());
    dispatch(clearState());

    const getAllCourses = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/course.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve courses:', response.statusText);
        } else {
          dispatch(setCourses(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving courses:', error.message);
      } finally {
        setTimeout(() => {
          dispatch(isLoadingFalse());
        }, 2000);
      }
    };
    getAllCourses();
  }, [dispatch]);


  const openModal = (modalName, userId) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddCourseModal(true);
        break;
      case 'import':
        setIsOpenImportCourseModal(true);
        break;
      case 'edit':
        setCourseId(userId);
        setIsOpenEditCourseModal(true);
        break;
      case 'delete':
        setCourseId(userId);
        setIsOpenDeleteCourseModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddCourseModal(false);
        break;
      case 'import':
        setIsOpenImportCourseModal(false);
        break;
      case 'edit':
        setIsOpenEditCourseModal(false);
        break;
      case 'delete':
        setIsOpenDeleteCourseModal(false);
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
      name: 'COURSE',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'COURSE CODE',
      selector: row => row.code,
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

          {isOpenEditCourseModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditCourse closeEditCourseModal={() => closeModal("edit")} Id={courseId} />
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

          {isOpenDeleteCourseModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteCourse closeDeleteCourseModal={() => closeModal("delete")} Id={courseId} />
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
            data={courses}
            filter={"title"}
            children={
              <div className="flex items-center gap-3">
                <>
                  <button
                    onClick={() => openModal("add")}
                    className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                  >
                    <MdAdd className='' /> <p>Add Course</p>
                  </button>

                  {isOpenAddCourseModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <AddCourse closeAddCourseModal={() => closeModal("add")} />
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
                    <MdImportExport className='' /> <p>Import Courses</p>
                  </button>

                  {isOpenImportCourseModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <ImportCourse closeImportCourseModal={() => closeModal("import")} />
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

export default Courses; 