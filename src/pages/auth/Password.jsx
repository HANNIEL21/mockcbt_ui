import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rsu-logo.png";
import { setUserDetails } from "../../redux/Features/User";

import { baseApiUrl, appName } from "../../utils/constants";

const Password = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isError } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!password.trim()) {
      return Alert("error", "Please enter your password");
    }
    try {
      const response = await axios.post(`${baseApiUrl}/login.php`, {
        password,
      });

      console.log(response, "response");

      if (!response.data.username) {
        return Alert("error", response?.data?.error || "Failed to login");
      }

      dispatch(setUserDetails(response.data));
      Alert("success", "user Login successful");
      return navigate("/dashboard");
    } catch (error) {
      console.log(error, "error");
      Alert(
        "error",
        error.response?.data?.message || error?.message,
        "Failed to login"
      );
    }
  };

  return (
    <main className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="w-2/4 h-full bg-white flex justify-center items-center">
        <img src={logo} alt="rsu logo" className="w-[50%] h-[40%]" />
      </div>
      <div className="w-3/4 flex justify-center items-center">
        <div className="w-[50%] h-[350px] p-4 flex justify-between items-center flex-col text-center">
          <h1 className="text-4xl font-bold text-blue-900 uppercase">
            {appName}
          </h1>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            className="w-[80%] bg-transparent border-2 outline-none focus:outline-blue-900 rounded-md p-3 text-lg font-bold text-blue-900 shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <button
            className=" block w-[70%] border-2 rounded-md border-blue-900 hover:bg-blue-900 font-bold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          {/* Display login error message */}
          {isError && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default Password;
