import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import EditFeedback from "./EditFeedback";
import DeleteFeedback from "./DeleteFeedback";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "../../../components/PageLoader";
import ModalOverlay from "../../../components/ModalOverlay";
import { setFeedback } from "../../../redux/Features/Dashboard";
import axios from "axios";
import { baseApiUrl } from "../../../utils/constants";

const Feedback = () => {
  const dispatch = useDispatch();
  const [isOpenEditFeedbackModal, setIsOpenEditFeedbackModal] = useState(false);
  const [isOpenDeleteFeedbackModal, setIsOpenDeleteFeedbackModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  const { feedback } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const req = await axios.get(`${baseApiUrl}/feedback.php`);
        console.log(req.data);
        dispatch(setFeedback(req.data));
      } catch (error) {
        console.error("Failed to fetch feedback data:", error);
      }
    };

    fetchFeedback();
  }, [dispatch]);

  console.log(feedback);
  

  const openModal = (modalName, feedbackId) => {
    switch (modalName) {
      case "edit":
        setSelectedFeedbackId(feedbackId);
        setIsOpenEditFeedbackModal(true);
        break;
      case "delete":
        setSelectedFeedbackId(feedbackId);
        setIsOpenDeleteFeedbackModal(true);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case "edit":
        setIsOpenEditFeedbackModal(false);
        break;
      case "delete":
        setIsOpenDeleteFeedbackModal(false);
        break;
      default:
        console.error("Invalid modal name");
    }
  };

  const feedbackColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "USER",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "SATISFACTION",
      selector: (row) => row.rate,
      sortable: true,
    },
    {
      name: "FEEDBACK",
      selector: (row) => row.feedback,
    },
    {
      name: "ACTIONS",
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className="text-xl text-green-700" />
          </button>

          {isOpenEditFeedbackModal && (
            <ModalOverlay>
              <EditFeedback
                closeEditModal={() => closeModal("edit")}
                id={selectedFeedbackId}
              />
            </ModalOverlay>
          )}

          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className="text-xl text-red-700" />
          </button>

          {isOpenDeleteFeedbackModal && (
            <ModalOverlay>
              <DeleteFeedback
                closeDeleteModal={() => closeModal("delete")}
                id={selectedFeedbackId}
              />
            </ModalOverlay>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white h-full rounded-lg shadow-md p-4">
      <Table
        title={"Feedback"}
        label={feedbackColumns}
        data={feedback}
        filter={"user"}
      />
    </div>
  );
};

export default Feedback;
