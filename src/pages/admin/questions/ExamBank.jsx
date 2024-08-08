import React, { useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdAdd, MdImportExport } from "react-icons/md";
import EditQuestion from "./EditQuestion";
import DeleteQuestion from "./DeleteQuestion";
import AddQuestion from "./AddQuestion";
import ImportQuestion from "./ImportQuestion";

import PageLoader from "../../../components/PageLoader";
import { useQuestions } from "../../../hooks/useQuestions";
import ModalOverlay from "../../../components/ModalOverlay";

const ExamBank = () => {
  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(false);
  const [isOpenImportQuestionModal, setIsOpenImportQuestionModal] =
    useState(false);
  const [isOpenEditQuestionModal, setIsOpenEditQuestionModal] = useState(false);
  const [isOpenDeleteQuestionModal, setIsOpenDeleteQuestionModal] =
    useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const { data: questions, isPending } = useQuestions();

  const openModal = (modalName, qId) => {
    switch (modalName) {
      case "add":
        setIsOpenAddQuestionModal(true);
        break;
      case "import":
        setIsOpenImportQuestionModal(true);
        break;
      case "edit":
        setSelectedQuestionId(qId);
        setIsOpenEditQuestionModal(true);
        break;
      case "delete":
        setSelectedQuestionId(qId);
        setIsOpenDeleteQuestionModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "add":
        setIsOpenAddQuestionModal(false);
        break;
      case "import":
        setIsOpenImportQuestionModal(false);
        break;
      case "edit":
        setIsOpenEditQuestionModal(false);
        break;
      case "delete":
        setIsOpenDeleteQuestionModal(false);
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
      name: "COURSE",
      width: "170px",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: "QUESTION",
      width: "170px",
      selector: (row) => row.question,
      sortable: true,
    },
    {
      name: "ANSWER",
      width: "150px",
      selector: (row) => row.answer,
      sortable: true,
    },
    {
      name: "CATEGORY",
      width: "170px",
      selector: (row) => row.category,
    },
    {
      name: "TYPE",
      width: "100px",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-4">
          <>
            <button
              data-test={row}
              onClick={() => openModal("edit", row.id)}
              className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
            >
              <MdEdit className="text-xl text-green-700" />
            </button>

            {isOpenEditQuestionModal && (
              <ModalOverlay>
                <EditQuestion
                  closeEditQuestionModal={() => closeModal("edit")}
                  qId={selectedQuestionId}
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

            {isOpenDeleteQuestionModal && (
              <ModalOverlay>
                <DeleteQuestion
                  closeDeleteQuestionModal={() => closeModal("delete")}
                  qId={selectedQuestionId}
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
      <>
        <Table
          label={columns}
          data={questions}
          del={"question"}
          isLoading={isPending}
          filter={"category"}
          children={
            <div className="flex items-center gap-3">
              <>
                <button
                  onClick={() => openModal("add")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdAdd className="" /> <p>Add Question</p>
                </button>

                {isOpenAddQuestionModal && (
                  <ModalOverlay>
                    <AddQuestion
                      closeAddQuestionModal={() => closeModal("add")}
                    />
                  </ModalOverlay>
                )}
              </>

              <>
                <button
                  onClick={() => openModal("import")}
                  className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
                >
                  <MdImportExport className="" /> <p>Import Questions</p>
                </button>

                {isOpenImportQuestionModal && (
                  <ModalOverlay>
                    <ImportQuestion
                      closeImportQuestionModal={() => closeModal("import")}
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

export default ExamBank;
