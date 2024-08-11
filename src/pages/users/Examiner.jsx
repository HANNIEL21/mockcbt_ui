import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import UserDetail from "../../components/UserDetail";
import Timmer from "../../components/Timmer";
import Alert from "../../components/Alert";
import { baseApiUrl } from "../../utils/constants";
import { setExamAnswers } from "../../redux/Features/Exam";

const Examiner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { questions, examDetails } = useSelector((state) => state.exam);
  const { userDetails } = useSelector((state) => state.user);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const duration = examDetails.duration;
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  console.log(questions);

  // Group the questions by course
  const groupedQuestions = questions.reduce((acc, question) => {
    const course = question.course; // Assuming each question has a 'course' property
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push(question);
    return acc;
  }, {});

  // Convert the grouped object to an array
  let groupedQuestionsArray = Object.entries(groupedQuestions).map(
    ([course, questions]) => ({
      course,
      questions,
    })
  );

  // Function to shuffle the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the grouped questions array
  useEffect(() => {
    groupedQuestionsArray = shuffleArray(groupedQuestionsArray);
  }, []);

  console.log(groupedQuestionsArray);

  const handleSelect = (qid, c, v) => {
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.qid === qid
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex].value = v;
      setAnswers(updatedAnswers);

      const correctAnswer = questions.find(
        (question) => question.id === qid
      ).answer;
      if (
        updatedAnswers[existingAnswerIndex].value !== correctAnswer &&
        v === correctAnswer
      ) {
        setScore((prevScore) => prevScore + 1);
      } else if (
        updatedAnswers[existingAnswerIndex].value === correctAnswer &&
        v !== correctAnswer
      ) {
        setScore((prevScore) => prevScore - 1);
      }
    } else {
      setAnswers([...answers, { qid, course: c, value: v }]);

      const correctAnswer = questions.find(
        (question) => question.id === qid
      ).answer;
      if (v === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleTimeout = (e) => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    console.log(answers);

    const correctAnswersByCourse = {};
    let totalCorrectAnswers = 0;

    // Iterate over each question and check if the answer is correct
    questions.forEach((question) => {
      // get candidate answer for that question
      const answer = answers.find((a) => a.qid === question.id);

      if (answer && answer.value === question.answer) {
        // Assuming 'answer' is the correct property in the question object
        totalCorrectAnswers++;
        const course = question.course;
        if (!correctAnswersByCourse.hasOwnProperty(course)) {
          correctAnswersByCourse[course] = 0;
        }
        correctAnswersByCourse[course]++;
      }
    });

    console.log(correctAnswersByCourse);

    const result = {
      exam: examDetails?.exam,
      title: examDetails?.title,
      questions: questions.length,
      firstname: userDetails?.firstname,
      lastname: userDetails?.lastname,
      score: score,
      examno: userDetails?.examno,
      course: userDetails?.course,
      attempted: answers.length,
      s1:
        userDetails?.s1.toString().toUpperCase() in correctAnswersByCourse
          ? correctAnswersByCourse[userDetails?.s1.toString().toUpperCase()]
          : 0,
      s2:
        userDetails?.s2.toString().toUpperCase() in correctAnswersByCourse
          ? correctAnswersByCourse[userDetails?.s2.toString().toUpperCase()]
          : 0,
      s3:
        userDetails?.s3.toString().toUpperCase() in correctAnswersByCourse
          ? correctAnswersByCourse[userDetails?.s3.toString().toUpperCase()]
          : 0,
      s4:
        userDetails?.s4.toString().toUpperCase() in correctAnswersByCourse
          ? correctAnswersByCourse[userDetails?.s4.toString().toUpperCase()]
          : 0,
    };

    console.log(result);

    try {
      const res = await axios.post(`${baseApiUrl}/result.php`, result);
      console.log(res);
      if (res.data.status === "success") {
        Alert(res.data.status, res.data.message);
        dispatch(setExamAnswers(answers));
        navigate("/review");
      }
      Alert(res.data.status, res.data.message);
      console.log(res.data.message);
    } catch (error) {
      Alert("error", error);
      console.log(error);
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNumberClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleCourseClick = (course) => {
    const courseQuestions = questions.sort(
      (question) => question.course === course
    );
    const firstQuestionIndex = questions.indexOf(courseQuestions[0]);
    setCurrentQuestionIndex(firstQuestionIndex);
    setSelectedCourse(course);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const options = [
    currentQuestion.opt1,
    currentQuestion.opt2,
    currentQuestion.opt3,
    currentQuestion.opt4,
  ];

  console.log(answers);

  useEffect(() => {
    function preventContextEvent(e) {
      e.preventDefault();
      Alert("warning", "You don't want to do this bruh");
    }

    function preventKeyDown(e) {
      if (
        e.ctrlKey &&
        (e.key === "Shift" || e.key === "Control" || e.key === "F12")
      ) {
        e.preventDefault();
        Alert("warning", "You don't want to do this bruh");
      }
    }

    function preventMouseDown(e) {
      if (e.button === 2) {
        e.preventDefault();
        Alert("warning", "You don't want to do this bruh");
      }
    }

    document.addEventListener("contextmenu", preventContextEvent);
    document.addEventListener("keydown", preventKeyDown);
    document.addEventListener("mousedown", preventMouseDown);

    return () => {
      document.removeEventListener("contextmenu", preventContextEvent);
      document.removeEventListener("keydown", preventKeyDown);
      document.removeEventListener("mousedown", preventMouseDown);
    };
  }, []);

  return (
    <div className="w-full h-screen flex">
      <section className="w-[45%] h-full bg-slate-50 shadow-md flex flex-col gap-10 justify-center items-center">
        <Timmer duration={duration} onTimeout={handleTimeout} />
        <UserDetail />
      </section>

      <section className="w-full h-full p-10 px-20 flex flex-col gap-8 relative">
        <p className="absolute font-bold text-gray-500 text-2xl -rotate-45 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          THIS IS ONLY A PREPARATORY TEST
        </p>
        <div
          key={currentQuestion.id}
          className="flex flex-col justify-between gap-16 bg-white/90  relative z-30"
        >
          <div>
            <p className="font-extrabold text-slate-600">
              {currentQuestion.course}
            </p>
            <h2 className="text-5xl font-bold text-blue-900">
              Question {currentQuestionIndex + 1}
            </h2>
          </div>
          <div className="h-full w-full">
            <form className="flex flex-col gap-10">
              <h3>{currentQuestion.question}</h3>
              <div>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name={`option-${currentQuestion.id}`}
                      value={option}
                      checked={answers.some(
                        (answer) =>
                          answer.qid === currentQuestion.id &&
                          answer.value === option
                      )}
                      onChange={() =>
                        handleSelect(
                          currentQuestion.id,
                          currentQuestion.course,
                          option
                        )
                      }
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="ml-2 text-lg text-gray-700 px-2 py-1"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              onClick={goToPrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="border-2 border-blue-900 hover:bg-blue-900 font-bold text-blue-900 text-lg rounded-lg hover:text-white uppercase px-20 py-4"
            >
              Prev
            </button>
            <button
              onClick={goToNextQuestion}
              className="border-2 border-blue-900 hover:bg-blue-900 font-bold text-blue-900 text-lg rounded-lg hover:text-white uppercase px-20 py-4"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <section className="w-[45%] h-full bg-slate-50 shadow-md">
        <div className="h-full flex gap-5 flex-col justify-center items-center p-5">
          <div className="w-full grid grid-cols-2 gap-2 place-content-center justify-items-center">
            {groupedQuestionsArray.map((item, index) => (
              <div
                key={index} // Use index as the key
                className={`w-full cursor-pointer uppercase font-bold rounded-md text-sm py-2 text-center border-2 border-slate-300 ${
                  item.course === currentQuestion.course
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-900"
                }`}
                onClick={() => {
                  console.log("Clicked course:", item.course);
                  const courseQuestions = questions.filter(
                    (question) => question.course === item.course
                  );
                  console.log("Course questions:", courseQuestions);
                  if (courseQuestions.length > 0) {
                    const firstQuestionIndex = questions.indexOf(
                      courseQuestions[0]
                    );
                    setCurrentQuestionIndex(firstQuestionIndex);
                    setSelectedCourse(item.course);
                    console.log(selectedCourse);
                  } else {
                    console.log("No questions found for course:", item.course);
                  }
                }}
              >
                {item.course}
              </div>
            ))}
          </div>
          <div className="h-[40%] overflow-y-auto overflow-scroll overflow-x-hidden grid grid-cols-5 gap-2 p-3 place-content-start">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`border-2 border-blue-900 text-blue-900 font-bold text-lg flex justify-center items-center w-8 h-8 rounded-md cursor-pointer ${
                  answers.find((answer) => answer.qid === question.id)
                    ? "border-none bg-blue-900 text-white"
                    : "bg-gray-300"
                } `}
                onClick={() => handleNumberClick(index)}
              >
                <h2 className="p-5 font-extrabold">{index + 1}</h2>
              </div>
            ))}
          </div>
          <h2 className="my-5 font-bold text-2xl">
            {answers.length} of {questions.length}
          </h2>
          {currentQuestionIndex + 1 === questions.length ? (
            <button
              className="border-2 border-green-900 hover:bg-green-900 font-bold text-green-900 text-lg rounded-lg hover:text-white uppercase px-20 py-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default Examiner;
