import React, { useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import AddUser from "./AddUser";
import ImportUser from "./ImportUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

import { useUsers } from "../../../hooks/useUsers";
import PageLoader from "../../../components/PageLoader";
import ModalOverlay from "../../../components/ModalOverlay";

const Users = () => {
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenImportUserModal, setIsOpenImportUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: users, isPending } = useUsers();

  const openModal = (modalName, userId) => {
    switch (modalName) {
      case "add":
        setIsOpenAddUserModal(true);
        break;
      case "import":
        setIsOpenImportUserModal(true);
        break;
      case "edit":
        setSelectedUserId(userId);
        setIsOpenEditUserModal(true);
        break;
      case "delete":
        setSelectedUserId(userId);
        setIsOpenDeleteUserModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "add":
        setIsOpenAddUserModal(false);
        break;
      case "import":
        setIsOpenImportUserModal(false);
        break;
      case "edit":
        setIsOpenEditUserModal(false);
        break;
      case "delete":
        setIsOpenDeleteUserModal(false);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  // COLUMNS FOR DATA TABLE
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "USER NAME",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "FIRST NAME",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "LAST NAME",
      selector: (row) => row.lastname,
    },
    {
      name: "PASSWORD",
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
    },
    {
      name: "ACTIONS",
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          <>
            <button
              onClick={() => openModal("edit", row.id)}
              className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
            >
              <MdEdit className="text-xl text-green-700" />
            </button>

            {isOpenEditUserModal && (
              <ModalOverlay>
                <EditUser
                  closeEditUserModal={() => closeModal("edit")}
                  userId={selectedUserId}
                />
              </ModalOverlay>
            )}
          </>
          <>
            <button
              onClick={() => openModal("delete", row.id)}
              className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
            >
              <MdDelete className="text-xl text-red-700" />
            </button>

            {isOpenDeleteUserModal && (
              <ModalOverlay>
                <DeleteUser
                  closeDeleteUserModal={() => closeModal("delete")}
                  userId={selectedUserId}
                />
              </ModalOverlay>
            )}
          </>
        </div>
      ),
    },
  ];

  if (isPending) return <PageLoader />;

  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
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
                <MdAdd className="" /> <p>Add User</p>
              </button>

              {isOpenAddUserModal && (
                <ModalOverlay>
                  <AddUser closeAddUserModal={() => closeModal("add")} />
                </ModalOverlay>
              )}
            </>

            <>
              <button
                onClick={() => openModal("import")}
                className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
              >
                <MdImportExport className="" /> <p>Import User</p>
              </button>

              {isOpenImportUserModal && (
                <ModalOverlay>
                  <ImportUser
                    closeImportUserModal={() => closeModal("import")}
                  />
                </ModalOverlay>
              )}
            </>
          </div>
        }
      />
    </div>
  );
};

export default Users;
