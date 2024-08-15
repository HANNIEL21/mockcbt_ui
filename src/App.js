import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { logout } from "./redux/Features/Auth";
import Alert from "./components/Alert";
import { baseApiUrl } from "./utils/constants";
import axios from "axios";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      const username = userDetails?.role === "USER" ? userDetails?.examno : userDetails?.username;
      try {
        const res = await axios.put(`${baseApiUrl}/login.php`, { username });
        console.log(res);
  
        if (res.data.status === "success") {
          dispatch(logout());
          Alert(res.data.status, res.data.message);
  
          // Log the event
          const log = {
            user: username,
            event: "LOGOUT"
          };
          const event = await axios.post(`${baseApiUrl}/log.php`, log);
          console.log(event.data);
  
          // Close the browser after 2 seconds
          setTimeout(() => {
            window.close(); // Closes the browser window/tab
          }, 6000);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const onClose = () => {
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        handleLogout();
      });
    };
  
    onClose();
  }, [userDetails, dispatch]);
  
  
  

  useEffect(() => {
    document.addEventListener("beforeunload", (e) => {
      navigator.sendBeacon("http://localhost:3000", "data");
    });
  }, []);

  return (
    <div className="App">
      <LiveChat />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/token" element={<AddToken />} />
          <Route path="/password" element={<Password />} />
          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <DashboardLayout /> : <Auth />}
          >
            <Route index element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="candidates" element={<Candidate />} />
            <Route path="exams" element={<Exams />} />
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
          <Route
            path="/select"
            element={isAuthenticated ? <Subject /> : <Auth />}
          />
          <Route
            path="/candidate"
            element={isAuthenticated ? <Details /> : <Auth />}
          />
          <Route
            path="/examiner/:id"
            element={isAuthenticated ? <Examiner /> : <Auth />}
          />
          <Route
            path="/instruction/:id"
            element={isAuthenticated ? <Instruction /> : <Auth />}
          />
          <Route
            path="/result"
            element={isAuthenticated ? <CandidateResult /> : <Auth />}
          />
          <Route
            path="/review"
            element={isAuthenticated ? <Review /> : <Auth />}
          />
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
