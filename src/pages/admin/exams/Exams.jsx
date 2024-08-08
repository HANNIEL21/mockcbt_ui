import React, { useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import EditExam from "./EditExam";
import DeleteExam from "./DeleteExam";
import AddExam from "./AddExam";

import { useExams } from "../../../hooks/useExams";
import PageLoader from "../../../components/PageLoader";
import ModalOverlay from "../../../components/ModalOverlay";

const Exams = () => {
  const [isOpenAddExamModal, setIsOpenAddExamModal] = useState(false);
  const [isOpenEditExamModal, setIsOpenEditExamModal] = useState(false);
  const [isOpenDeleteExamModal, setIsOpenDeleteExamModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const { data: exams, isPending } = useExams();

  const openModal = (modalName, examId) => {
    switch (modalName) {
      case "add":
        setIsOpenAddExamModal(true);
        break;
      case "edit":
        setSelectedExamId(examId);
        setIsOpenEditExamModal(true);
        break;
      case "delete":
        setSelectedExamId(examId);
        setIsOpenDeleteExamModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "add":
        setIsOpenAddExamModal(false);
        break;
      case "edit":
        setIsOpenEditExamModal(false);
        break;
      case "delete":
        setIsOpenDeleteExamModal(false);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const exam = [
    {
      name: "ID",
      selector: (row) => row.exam_id,
      sortable: true,
    },
    {
      name: "EXAM NAME",
      selector: (row) => row.exam,
      sortable: true,
    },
    {
      name: "START",
      selector: (row) => row.start,
      sortable: true,
    },
    {
      name: "END",
      selector: (row) => row.end,
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "GROUP",
      selector: (row) => row.group,
      sortable: true,
    },
    {
      name: "NO OF QUESTIONS",
      selector: (row) => row.questions,
      sortable: true,
    },
    {
      name: "DURATION",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "ACTIONS",
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          <>
            <button
              onClick={() => openModal("edit", row.exam_id)}
              className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
            >
              <MdEdit className="text-xl text-green-700" />
            </button>

            {isOpenEditExamModal && (
              <ModalOverlay>
                <EditExam
                  closeEditExamModal={() => closeModal("edit")}
                  examId={selectedExamId}
                />
              </ModalOverlay>
            )}
          </>
          <>
            <button
              onClick={() => openModal("delete", row.exam_id)}
              className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
            >
              <MdDelete className="text-xl text-red-700" />
            </button>

            {isOpenDeleteExamModal && (
              <PageLoader>
                <DeleteExam
                  closeDeleteExamModal={() => closeModal("delete")}
                  examId={selectedExamId}
                />
              </PageLoader>
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
        label={exam}
        data={exams}
        filter={"exam"}
        children={
          <>
            <button
              onClick={() => openModal("add")}
              className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
            >
              <MdAdd className="" /> <p>Add Exam</p>
            </button>

            {isOpenAddExamModal && (
              <ModalOverlay>
                <AddExam closeAddExamModal={() => closeModal("add")} />
              </ModalOverlay>
            )}
          </>
        }
      />
    </div>
  );
};

export default Exams;
