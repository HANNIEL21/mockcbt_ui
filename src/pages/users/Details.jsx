import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setExamDetails, setQuestions } from "../../redux/Features/Exam";
import { baseApiUrl } from "../../utils/constants";
import { logout, setIsAuthenticatedFalse } from "../../redux/Features/Auth";
import Alert from "../../components/Alert";
import { IoKey, IoLogOut } from "react-icons/io5";
import AddToken from "./AddToken";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { userDetails } = useSelector((state) => state.user);
  const { examDetails } = useSelector((state) => state.exam);

  

  const handleStartExam = async () => {
    if (!userDetails.token) {
      Alert("warning", "No Access Token");
      setIsOpenModal(true);
      return;
    }
    try {
      const res = await axios.get(`${baseApiUrl}/exam.php`);

      // check for reoccurring exam
      const reoccurringExam = res.data.filter(
        (exam) =>
          exam.category === "Multi Choice - Multi Attempt" &&
          exam.group === userDetails?.group
      );
      if (reoccurringExam.length > 0) {
        dispatch(setExamDetails(reoccurringExam[0]));
        const today = new Date();
        const expire = new Date(examDetails?.end);

        if (expire.toDateString() === today.toDateString()) {
          Alert("info", "Exam Ended");
          return;
        }

        const sub = {
          id: examDetails?.exam_id,
          sub1: userDetails?.s1,
          sub2: userDetails?.s2,
          sub3: userDetails?.s3,
          sub4: userDetails?.s4,
        };

        const res = await axios.post(`${baseApiUrl}/start.php`, sub);

        if (res.data.status === "success") {
          const questions = res.data.questions;

          // Group the questions by course
          const groupedQuestions = {};
          questions.forEach((question) => {
            if (!groupedQuestions[question.course]) {
              groupedQuestions[question.course] = [];
            }
            groupedQuestions[question.course].push(question);
          });

          // Shuffle the groups
          const shuffledGroups = Object.values(groupedQuestions);
          for (let i = shuffledGroups.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledGroups[i], shuffledGroups[j]] = [
              shuffledGroups[j],
              shuffledGroups[i],
            ];
          }

          // Flatten the array
          const shuffledQuestions = shuffledGroups.flat();

          console.log(shuffledQuestions);
          dispatch(setQuestions(shuffledQuestions));
        } else {
          Alert(res.data.status, res.data.message);
        }
        // navigate(`/instruction/${examDetails?.exam_id}`);
        navigate(`/instruction/${examDetails?.exam_id}`);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewResult = async () => {
    navigate("/result");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsAuthenticatedFalse());
    navigate("/");
  };

  const handleOpenModal = () => {
    if (!!userDetails.token) return;
    setIsOpenModal(!isOpenModal);
  };

  return (
    <main className="h-screen w-screen bg-gray-200 flex flex-col">
      <section className=" w-full h-24 flex justify-between items-center px-10">
        <div className="flex flex-col items-start">
          <p>Hello</p>
          {userDetails && (
            <p className="font-bold text-3xl text-blue-900">
              {userDetails?.firstname} {userDetails?.lastname}
            </p>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <>
            <button
              disabled={!!userDetails.token}
              onClick={handleOpenModal}
              className={`border-2 ${
                userDetails?.token
                  ? " border-green-800 hover:bg-green-300 text-green-800"
                  : " border-red-800 hover:bg-red-300 text-red-800"
              } font-bold text-sm rounded-md capitalize py-1 px-2 focus:outline-none flex items-center flex-row-reverse gap-2`}
            >
              <IoKey className="text-2xl" />
              {userDetails?.token === null || ""
                ? "Click to add token"
                : userDetails?.token}
            </button>

            {isOpenModal && (
              <div
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <AddToken
                      closeModal={handleOpenModal}
                      user={userDetails?.examno}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
          <div className="h-16 w-16 flex items-center">
            {userDetails?.avatar ? (
              <>
                <img
                  src={`${baseApiUrl}/images/${userDetails?.avatar}`}
                  alt="User Avatar"
                  className="w-[65%] h-[65%] rounded-md shadow-md"
                />
              </>
            ) : (
              <div className="bg-white shadow-md rounded-xl p-2 flex items-center justify-center">
                <IoPerson className="text-blue-800 text-3xl" />
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex gap-1 items-center text-red-500 font-bold rounded-md uppercase  hover:underline"
          >
            logout <IoLogOut />
          </button>
        </div>
      </section>
      <section className="flex w-full h-full justify-around items-center">
        <div
          onClick={handleStartExam}
          className="bg-gradient-to-br from-green-800 to-blue-800 p-2 h-[250px] w-[250px] rounded-2xl shadow-md flex items-center justify-center cursor-pointer"
        >
          <h2 className="text-white font-extrabold text-5xl uppercase bg-transparent">
            take <br /> exam
          </h2>
        </div>
        <div
          onClick={handleViewResult}
          className="bg-gradient-to-tr from-blue-800 to-green-800 p-2 h-[250px] w-[250px] rounded-2xl shadow-md flex items-center justify-center cursor-pointer"
        >
          <h2 className="text-white font-extrabold text-5xl uppercase bg-transparent">
            view <br /> results
          </h2>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default Details;
