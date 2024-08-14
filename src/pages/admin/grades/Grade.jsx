import React, { useState } from "react";
import Table from "../../../components/Table";
import {
  MdDelete,
  MdRemoveRedEye,
  MdImportExport,
  MdPrint,
} from "react-icons/md";
import DeleteResult from "./DeleteResult";
import ViewResult from "./ViewResult";

import { useResults } from "../../../hooks/useResults";
import PageLoader from "../../../components/PageLoader";
import ModalOverlay from "../../../components/ModalOverlay";

const Grade = () => {
  const [isOpenViewResultModal, setIsOpenViewResultModal] = useState(false);
  const [isOpenEditResultModal, setIsOpenEditResultModal] = useState(false);
  const [isOpenDeleteResultModal, setIsOpenDeleteResultModal] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const { data: results, isPending } = useResults();

  console.log(results);

  const openModal = (modalName, rId, data) => {
    switch (modalName) {
      case "edit":
        setSelectedResultId(rId);
        setIsOpenEditResultModal(true);
        break;
      case "view":
        setSelectedResultId(rId);
        setSelectedResult(data);
        setIsOpenViewResultModal(true);
        break;
      case "delete":
        setSelectedResultId(rId);
        setIsOpenDeleteResultModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "view":
        setIsOpenViewResultModal(false);
        break;
      case "edit":
        setIsOpenEditResultModal(false);
        break;
      case "delete":
        setIsOpenDeleteResultModal(false);
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
      name: "EXAM",
      selector: (row) => row.exam,
      sortable: true,
    },
    {
      name: "FIRSTNAME",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "LASTNAME",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "EXAM NUMBER",
      selector: (row) => row.examno,
      sortable: true,
    },
    {
      name: "ATTEMPTS",
      selector: (row) => row.attempt,
      sortable: true,
    },
    {
      name: "SCORE",
      selector: (row) => row.score,
    },
    {
      name: "ACTIONS",
      grow: 2,
      cell: (row) => (
        <div key={row.id} className="flex gap-4">
          <button
            onClick={() => {
              openModal("view", row.id, row);
            }}
            className="border-2 border-blue-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdRemoveRedEye className="text-xl text-blue-700" />
          </button>

          {isOpenViewResultModal && (
            <ModalOverlay>
              <ViewResult
                closeViewResultModal={() => closeModal("view")}
                data={selectedResult}
              />
            </ModalOverlay>
          )}

          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className="text-xl text-red-700" />
          </button>

          {isOpenDeleteResultModal && (
            <ModalOverlay>
              <DeleteResult
                closeDeleteResultModal={() => closeModal("delete")}
                rId={selectedResultId}
              />
            </ModalOverlay>
          )}
        </div>
      ),
    },
  ];  

  if (isPending) return <PageLoader />;

  return (
    <div className="h-full p-4 ">
      <Table
        title={"results"}
        showFilter={true}
        label={columns}
        data={results}
        del={"result"}
        filter={"firstname"}
        children={
          <div className="flex items-center gap-3">
            <button className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none">
              <MdPrint className="" /> <p>Print Results</p>
            </button>
            <button className="bg-blue-900 flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none">
              <MdImportExport className="" /> <p>Export Results</p>
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Grade;
