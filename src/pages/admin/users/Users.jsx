import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Table';
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import AddUser from './AddUser';
import ImportUser from './ImportUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

import { setUsers, clearState, isLoadingFalse, isLoadingTrue } from '../../../redux/Features/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { baseApiUrl } from '../../../utils/constants';

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.dashboard);

  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenImportUserModal, setIsOpenImportUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(isLoadingTrue());
    dispatch(clearState());

    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/user.php`);
        if (response.status !== 200) {
          console.error('Failed to retrieve users:', response.statusText);
        } else {
          dispatch(setUsers(response.data));
        }
      } catch (error) {
        console.error('An error occurred while retrieving users:', error.message);
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
        setIsOpenAddUserModal(true);
        break;
      case 'import':
        setIsOpenImportUserModal(true);
        break;
      case 'edit':
        setSelectedUserId(userId);
        setIsOpenEditUserModal(true);
        break;
      case 'delete':
        setSelectedUserId(userId);
        setIsOpenDeleteUserModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddUserModal(false);
        break;
      case 'import':
        setIsOpenImportUserModal(false);
        break;
      case 'edit':
        setIsOpenEditUserModal(false);
        break;
      case 'delete':
        setIsOpenDeleteUserModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  // COLUMNS FOR DATA TABLE
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
      name: 'FIRST NAME',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'LAST NAME',
      selector: row => row.lastname,
    },
    {
      name: 'PASSWORD',
      selector: row => row.password,
      sortable: true,
    },
    {
      name: 'ROLE',
      selector: row => row.role,
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

          {isOpenEditUserModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditUser closeEditUserModal={() => closeModal("edit")} userId={selectedUserId} />
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

          {isOpenDeleteUserModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteUser closeDeleteUserModal={() => closeModal("delete")} userId={selectedUserId} />
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
          <Loader  />
        </div>
      ) : (
        <>
          <Table
            label={columns}
            data={users}
            del={"user"}
            filter={"firstname"}
            children={
              <div className="flex items-center gap-3">
                <>
                  <button
                    onClick={() => openModal("add")}
                    className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                  >
                    <MdAdd className='' /> <p>Add User</p>
                  </button>

                  {isOpenAddUserModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <AddUser closeAddUserModal={() => closeModal("add")} />
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
                    <MdImportExport className='' /> <p>Import User</p>
                  </button>

                  {isOpenImportUserModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <ImportUser closeImportUserModal={() => closeModal("import")} />
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
  );
};

export default Users;
