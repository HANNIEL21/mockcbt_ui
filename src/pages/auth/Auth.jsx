import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rsu-logo.png";
import { logout, setUserDetails } from "../../redux/Features/User";
import { baseApiUrl, appName } from "../../utils/constants";
import LiveChat from "../../components/LiveChat";
import Alert from "../../components/Alert";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, isError } = useSelector((state) => state.auth);
  const [regNumber, setRegNumber] = useState("");

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleLogin = async () => {
    if (!regNumber.trim()) {
      return Alert("error", "Please enter your registration number");
    }

    try {
      const response = await axios.post(`${baseApiUrl}/login.php`, {
        username: regNumber,
      });

      if (response.data.status !== "success") {
        return Alert("error", response.data.message);
      }

      dispatch(setUserDetails(response.data?.data));

      const userRole = response.data?.data?.role;

      try {
        const log = {
          user: response.data?.data?.username,
          event: "LOGIN",
        };
        const event = await axios.post(`${baseApiUrl}/log.php`, log);
        console.log(event.data);
      } catch (error) {
        console.log(error.message);
      }

      if (userRole === "SA" || userRole === "ADMIN") {
        return navigate("/password");
      }

      if (userRole === "USER") {
        return navigate("/candidate", {
          replace: true,
        });
      }
    } catch (error) {
      Alert(
        "error",
        error.response?.data?.message || error?.message || "Failed to login"
      );
    }
  };

  return (
    <>
      <main className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="hidden md:inline-flex  w-2/4 h-full bg-white justify-center items-center">
          <img src={logo} alt="rsu logo" className="w-[50%] h-[40%]" />
        </div>
        <div className="w-3/4 flex justify-center items-center">
          <div className="md:w-[50%] h-[350px] p-4 flex justify-between items-center flex-col text-center">
            <h1 className="text-6xl font-extrabold text-blue-900 uppercase">
              {appName}
            </h1>
            <input
              type="text"
              placeholder="Reg Number"
              className="w-full md:w-[80%] bg-transparent border-2 outline-none focus:outline-blue-900 rounded-md p-3 text-lg font-bold text-blue-900 shadow-md"
              // value={username}
              onChange={(e) => setRegNumber(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              value={regNumber}
            />
            <button
              className="w-full md:w-[70%] border-2 rounded-md border-blue-900 hover:bg-blue-900 font-extrabold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md"
              onClick={handleLogin}
            >
              LOGIN
            </button>
            {/* Display login error message */}
            {isError && <p className="text-red-500">{error}</p>}
            {/* <Link to="/signup" className='font-bold text-blue-900'>Create Account</Link> */}
          </div>
        </div>
      </main>
      <LiveChat />
    </>
  );
};

export default Auth;
