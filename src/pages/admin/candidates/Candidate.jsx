import React, { useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import AddCandidate from "./AddCandidate";
import ImportCandidate from "./ImportCandidate";
import DeleteCandidate from "./DeleteCandidate";
import EditCandidate from "./EditCandidate";
import ModalOverlay from "./../../../components/ModalOverlay";

import { useCandidates } from "../../../hooks/useCandidates";
import PageLoader from "../../../components/PageLoader";

const Candidate = () => {
  const [isOpenAddCandidateModal, setIsOpenAddCandidateModal] = useState(false);
  const [isOpenImportCandidateModal, setIsOpenImportCandidateModal] =
    useState(false);
  const [isOpenEditCandidateModal, setIsOpenEditCandidateModal] =
    useState(false);
  const [isOpenDeleteCandidateModal, setIsOpenDeleteCandidateModal] =
    useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const openModal = (modalName, userId) => {
    switch (modalName) {
      case "add":
        setIsOpenAddCandidateModal(true);
        break;
      case "import":
        setIsOpenImportCandidateModal(true);
        break;
      case "edit":
        setSelectedCandidateId(userId);
        setIsOpenEditCandidateModal(true);
        break;
      case "delete":
        setSelectedCandidateId(userId);
        setIsOpenDeleteCandidateModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "add":
        setIsOpenAddCandidateModal(false);
        break;
      case "import":
        setIsOpenImportCandidateModal(false);
        break;
      case "edit":
        setIsOpenEditCandidateModal(false);
        break;
      case "delete":
        setIsOpenDeleteCandidateModal(false);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

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
      name: "EXAM NUMBER",
      selector: (row) => row.examno,
    },
    {
      name: "GENDER",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "COURSE",
      selector: (row) => row.course,
      sortable: true,
    },
    // {
    //   name: "TOKEN",
    //   selector: (row) => row.token,
    // },
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

            {isOpenEditCandidateModal && (
              <ModalOverlay>
                <EditCandidate
                  closeEditCandidateModal={() => closeModal("edit")}
                  userId={selectedCandidateId}
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

            {isOpenDeleteCandidateModal && (
              <ModalOverlay>
                <DeleteCandidate
                  closeDeleteCandidateModal={() => closeModal("delete")}
                  userId={selectedCandidateId}
                />
              </ModalOverlay>
            )}
          </>
        </div>
      ),
    },
  ];

  const { data: candidates, isPending } = useCandidates();

  if (isPending) return <PageLoader />;

  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
      <>
        <Table
          title="candidates"
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
                  <MdAdd className="" /> <p>Add Candidate</p>
                </button>

                {isOpenAddCandidateModal && (
                  <ModalOverlay>
                    <AddCandidate
                      closeAddCandidateModal={() => closeModal("add")}
                    />
                  </ModalOverlay>
                )}
              </>

              <>
                <button
                  onClick={() => openModal("import")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdImportExport className="" /> <p>Import Candidates</p>
                </button>

                {isOpenImportCandidateModal && (
                  <ModalOverlay>
                    <ImportCandidate
                      closeImportCandidateModal={() => closeModal("import")}
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

export default Candidate;
