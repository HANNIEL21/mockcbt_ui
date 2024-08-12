import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, setError } from "../../redux/Features/Exam";

import { IoArrowBackOutline } from "react-icons/io5";

const Instruction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { examDetails, questions, isError, errorMessage } = useSelector(
    (state) => state.exam
  );
  const { userDetails } = useSelector((state) => state.user);

  console.log(questions, isError);

  dispatch(clearState());
  

  useEffect(() => {}, []);

  const handleClick = () => {
    dispatch(setError(null));
    if (examDetails?.type === "EXAMINER") {
      if (questions.length === 0) {
        dispatch(setError("No question found for this exam"));
        return;
      }
      navigate(`/examiner/${id}`);
    } else {
      navigate("/*");
    }
  };

  return (
    <main className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <button
        onClick={() => navigate("/candidate")}
        className="absolute top-4 left-4 text-blue-900 rounded-full px-4 py-2"
      >
        <IoArrowBackOutline className="text-2xl" />
      </button>
      <section className="flex flex-col h-[70%] w-[80%] justify-around items-start">
        <div>
          <p className="text-base font-extrabold text-blue-900 capitalize">
            {userDetails?.course}
          </p>
          <h1 className="text-5xl font-bold text-blue-900 capitalize">
            {examDetails?.exam}
          </h1>
        </div>
        <div className="w-full flex flex-col justify-between items-start">
          <div className="text-gray-600">
            <h3 className=" text-2xl font-bold mb-3">EXAM INSTRUCTIONS:</h3>

            <ul className="list-item">
              <li className="uppercase font-semibold text-red-600">
                THIS IS A PREPARATORY EXAM
              </li>
              <li className="uppercase font-semibold">
                This exam will last for {examDetails?.duration} minutes only.
              </li>
              <li className="uppercase font-semibold">
                Read each question carefully and select the appropriate Answer.
              </li>
              <li className="uppercase font-semibold">
                THE EXAM ENDS WHEN THE SUBMIT BUTTON IS CLICKED.
              </li>
              <li className="uppercase font-semibold">
                YOUR EXAM WILL AUTOMATICALLY BE SUBMITTED ONCE YOUR TIME
                EXPIRES.
              </li>
              <li className="uppercase font-semibold">
                ENSURE YOU LOGOUT AFTER SUBMISSION{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center ">
          <button
            onClick={handleClick}
            disabled={isError ? true : false}
            className={`border-2 border-blue-900 ${
              isError ? "" : "hover:bg-blue-900 hover:text-white"
            } font-bold text-blue-900 text-lg rounded-lg  uppercase px-24 py-4`}
          >
            start exam
          </button>
          {isError && (
            <p className="mt-2 text-red-500 font-bold capitalize">
              {errorMessage}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Instruction;
