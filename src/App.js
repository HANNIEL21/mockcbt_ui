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
import UserLayout from "./pages/users/UserLayout";
import { logout } from "./redux/Features/User";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // const username = (user.role = "USER" ? user?.examno : user?.username);

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

  const setSession = () => {
    const timeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    const expirationTime = Date.now() + timeout; // Current time + 30 minutes
    sessionStorage.setItem("timeout", expirationTime.toString());
  };

  useEffect(() => {
    setSession();
    onClose();
  }, [userDetails, dispatch]);

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
