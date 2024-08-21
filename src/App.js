import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Auth from "./pages/auth/Auth";
import DashboardLayout from "./pages/admin/dashboardLayout";
import Overview from "./pages/admin/Overview";
import Users from "./pages/admin/users/Users";
import Candidate from "./pages/admin/candidates/Candidate";
import Exams from "./pages/admin/exams/Exams";
import ExamBank from "./pages/admin/questions/ExamBank";
import Settings from "./pages/admin/config/Settings";
import Category from "./pages/admin/config/Category";
import Group from "./pages/admin/config/Group";
import Details from "./pages/users/Details";
import Grade from "./pages/admin/grades/Grade";
import CandidateResult from "./pages/users/CandidateResult";
import Instruction from "./pages/users/Instruction";
import Examiner from "./pages/users/Examiner";
import Password from "./pages/auth/Password";
import Faculty from "./pages/admin/config/faculty/Faculty";
import Department from "./pages/admin/config/department/Department";
import Courses from "./pages/admin/config/course/Courses";
import Result from "./pages/admin/config/Result";
import General from "./pages/admin/config/General";
import AddToken from "./pages/auth/AddToken";
import Token from "./pages/admin/token/Token";
import Subject from "./pages/users/Subject";
import Review from "./pages/users/Review";
import Log from "./pages/admin/log/Log";
import LiveChat from "./components/LiveChat";
import UserLayout from "./pages/users/UserLayout";
import { logout } from "./redux/Features/User";
import Feedback from "./pages/admin/feedback/Feedback";

function App() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("timeout");
    dispatch(logout());
  };

  const setSession = () => {
    const timeout = 3 * 60 * 1000; // 30 minutes in milliseconds
    const expirationTime = Date.now() + timeout; // Current time + 30 minutes
    sessionStorage.setItem("timeout", expirationTime.toString());
  };
  
  const checkSessionTimeout = () => {
    const timeout = sessionStorage.getItem("timeout");

    if (timeout) {
      const expirationDate = new Date(parseInt(timeout, 10));
      const currentDate = new Date();

      if (expirationDate.getTime() <= currentDate.getTime()) {
        handleLogout();
        console.log("Session has expired.");
      } else {
        console.log(`Session expires at: ${expirationDate.toLocaleTimeString()}`);
      }
    } else {
      console.log("No session timeout found.");
    }
  };

  useEffect(() => {
    setSession();
    const intervalId = setInterval(checkSessionTimeout, 1000 * 60); // Check every minute
    onClose();

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, [dispatch]);

  const onClose = () => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      handleLogout();
    });
  };

  return (
    <div className="App">
      <LiveChat />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/token" element={<AddToken />} />
          <Route path="/password" element={<Password />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="candidates" element={<Candidate />} />
            <Route path="exams" element={<Exams />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="exam-bank" element={<ExamBank />} />
            <Route path="results" element={<Grade />} />
            <Route path="token" element={<Token />} />
            <Route path="log" element={<Log />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<General />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="department" element={<Department />} />
              <Route path="course" element={<Courses />} />
              <Route path="result" element={<Result />} />
              <Route path="category" element={<Category />} />
              <Route path="group" element={<Group />} />
            </Route>
          </Route>
          <Route element={<UserLayout />}>
            <Route path="/select" element={<Subject />} />
            <Route path="/candidate" element={<Details />} />
            <Route path="/examiner/:id" element={<Examiner />} />
            <Route path="/instruction/:id" element={<Instruction />} />
            <Route path="/result" element={<CandidateResult />} />
            <Route path="/review" element={<Review />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="h-screen w-screen text-4xl flex justify-center items-center">
                404
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
