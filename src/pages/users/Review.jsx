import React from 'react';
import { useSelector } from "react-redux";
import { MdHome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();
  const { questions, answers } = useSelector((state) => state.exam);

  // Filter questions to include only those that have been answered
  const answeredQuestions = questions.filter((question) =>
    answers.some((answer) => answer.qid === question.id)
  );

  return (
    <div className='flex flex-col gap-10 items-center justify-center p-6'>
      <div>
        <button onClick={() => navigate('/candidate')} className=" absolute top-8 left-4 text-blue-900 rounded-full px-4 py-2 flex ">
          <MdHome className='text-2xl' /> HOME
        </button>
        <button onClick={() => navigate('/result')} className=" absolute top-8 right-4 rounded-full px-4 py-2 capitalize text-green-700 font-bold flex items-center gap-3">
          View Result
        </button>
      </div>

      <h1 className='text-5xl font-extrabold uppercase'>EXAM REVIEW</h1>
      <div className='w-[50%] flex flex-col gap-3 relative'>
        {answeredQuestions.map((question) => {
          const selectedAnswer = answers.find((answer) => answer.qid === question.id);
          const isCorrect = selectedAnswer && question.answer === selectedAnswer.value;

          return (
            <div key={question.id} className='bg-slate-400 p-3 rounded-md relative'>
              <div
                className={`absolute top-4 right-4 h-4 w-4 rounded-full shadow-lg p-2 
            ${isCorrect ? "bg-green-700" : "bg-red-700"}`}
              ></div>
              <h2 className='font-extrabold text-lg'>Question:</h2>
              <p>{question.question}</p>
              <h2 className='font-extrabold text-lg'>Selected Option:</h2>
              <p>{selectedAnswer ? selectedAnswer.value : 'No option selected'}</p>
              <h2 className='font-extrabold text-lg'>Correct Answer:</h2>
              <p>{question.answer}</p>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default Review;
