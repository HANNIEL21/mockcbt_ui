import React, { useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdPrint, MdAdd, MdImportExport } from "react-icons/md";
import EditToken from "./EditToken";
import { useSelector } from "react-redux"
import AddToken from "./AddToken";
import GenerateTokens from "./GenerateTokens";
import DeleteToken from "./DeleteToken";
import ModalOverlay from "../../../components/ModalOverlay";
import { useTokens } from "../../../hooks/useTokens";
import Ticket from "./Ticket";

const Token = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenGenerateModal, setIsOpenGenerateModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: tokens, isPending } = useTokens();
  const { userDetails } = useSelector((state) => state.user);

  console.log(userDetails);

  const openModal = (modalName, qId) => {
    switch (modalName) {
      case "add":
        setIsOpenAddModal(true);
        break;
      case "generate":
        setIsOpenGenerateModal(true);
        break;
      case "edit":
        setSelectedId(qId);
        setIsOpenEditModal(true);
        break;
      case "delete":
        setSelectedId(qId);
        setIsOpenDeleteModal(true);
        break;
      case "ticket":
        setSelectedId(qId);
        setIsOpenTicketModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "add":
        setIsOpenAddModal(false);
        break;
      case "generate":
        setIsOpenGenerateModal(false);
        break;
      case "edit":
        setIsOpenEditModal(false);
        break;
      case "delete":
        setIsOpenDeleteModal(false);
        break;
      case "ticket":
        setIsOpenTicketModal(false);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const columns = [
    {
      name: "ID",
      width: "60px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "TOKEN",
      selector: (row) => row.token,
      sortable: true,
    },
    {
      name: "USER",
      width: "200px",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "EXPIRES",
      selector: (row) => row.expires_at,
      sortable: true,
    },
    {
      name: "CREATED",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-4">
          {userDetails?.role === "SA" && (
            <>
              <button
                onClick={() => openModal("edit", row.id)}
                className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
              >
                <MdEdit className="text-xl text-green-700" />
              </button>
    
              {isOpenEditModal && (
                <ModalOverlay>
                  <EditToken
                    closeEditTokenModal={() => closeModal("edit")}
                    id={selectedId}
                  />
                </ModalOverlay>
              )}
            </>
          )}
    
          {userDetails?.role === "SA" && (
            <>
              <button
                onClick={() => openModal("delete", row.id)}
                className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
              >
                <MdDelete className="text-xl text-red-700" />
              </button>
    
              {isOpenDeleteModal && (
                <ModalOverlay>
                  <DeleteToken
                    closeDeleteTokenModal={() => closeModal("delete")}
                    id={selectedId}
                  />
                </ModalOverlay>
              )}
            </>
          )}
    
          <button
            onClick={() => openModal("ticket", row.id)}
            className="border-2 border-blue-700 hover:bg-blue-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdPrint className="text-xl text-blue-700" />
          </button>
    
          {isOpenTicketModal && (
            <ModalOverlay>
              <Ticket
                closeTicketModal={() => closeModal("ticket")}
                id={selectedId}
                token={row.token}
              />
            </ModalOverlay>
          )}
        </div>
      ),
    },
    

  ];


  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
      <>
        <Table
          title={"TOKEN"}
          showFilter={true}
          label={columns}
          data={tokens}
          del={"token"}
          isLoading={isPending}
          filter={"token"}
          children={
            <div className="flex items-center gap-3">
              <>
                <button
                  onClick={() => openModal("add")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdAdd className="" /> <p>Add Token</p>
                </button>

                {isOpenAddModal && (
                  <ModalOverlay>
                    <AddToken closeAddModal={() => closeModal("add")} />
                  </ModalOverlay>
                )}
              </>

              <>
                <button
                  onClick={() => openModal("generate")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdAdd className="" /> <p>Generate Tokens</p>
                </button>

                {isOpenGenerateModal && (
                  <ModalOverlay>
                    <GenerateTokens
                      closeGenerateModal={() => closeModal("generate")}
                    />
                  </ModalOverlay>
                )}
              </>
            </div>
          }
        />
      </>
    </div>
  );
};

export default Token;
