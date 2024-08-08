import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/rsu-logo.png";
import { appName, baseApiUrl } from "../utils/constants";
import {
  BsFillGridFill,
  BsGrid,
  BsFileText,
  BsFileTextFill,
  BsFileEarmarkText,
  BsFileEarmarkTextFill,
  BsBriefcase,
  BsBriefcaseFill,
} from "react-icons/bs";
import { PiUsers, PiUsersFill } from "react-icons/pi";
import { RiSettings5Fill, RiSettings5Line } from "react-icons/ri";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";
import { IoKey, IoKeyOutline } from "react-icons/io5";
import { Logout } from "../redux/Features/User";
import { setSelected } from "../redux/Features/Tabs";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { tab } = useSelector((state) => state.tab);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails?.role === "ADMIN") {
      dispatch(setSelected("/dashboard"));
    } else if (userDetails?.role === "EXAMINER") {
      dispatch(setSelected("/dashboard/users"));
    }
  }, [userDetails]);

  const selected = location.pathname;

  function handleLinkClick(link) {
    dispatch(setSelected(link));
  }

  const handleLogout = async() => {
    const username = userDetails?.username;
    const res = await axios.put(`${baseApiUrl}/login.php`, {
      username,
    });
    console.log(res);
    if(res.data.status === "success"){
      dispatch(Logout());
      Alert(res.data.status, res.data.message);
      navigate("/");

    }
    
    return;
  }

  const sa = [
    {
      id: 1,
      text: "Dashboard",
      to: "/dashboard",
      icon: <BsGrid />,
      activeIcon: <BsFillGridFill className="text-xl" />,
    },
    {
      id: 2,
      text: "Exams",
      to: "/dashboard/exams",
      icon: <BsFileText />,
      activeIcon: <BsFileTextFill className="text-xl" />,
    },
    {
      id: 3,
      text: "Candidates",
      to: "/dashboard/candidates",
      icon: <HiOutlineUserGroup />,
      activeIcon: <HiUserGroup className="text-xl" />,
    },
    {
      id: 4,
      text: "Admins",
      to: "/dashboard/users",
      icon: <PiUsers />,
      activeIcon: <PiUsersFill className="text-xl" />,
    },
    {
      id: 5,
      text: "Questions",
      to: "/dashboard/exam-bank",
      icon: <BsBriefcase />,
      activeIcon: <BsBriefcaseFill className="text-xl" />,
    },
    {
      id: 6,
      text: "Results",
      to: "/dashboard/results",
      icon: <BsFileEarmarkText />,
      activeIcon: <BsFileEarmarkTextFill className="text-xl" />,
    },
    {
      id: 7,
      text: "Token",
      to: "/dashboard/token",
      icon: <IoKeyOutline />,
      activeIcon: <IoKey className="text-xl" />,
    },
    {
      id: 8,
      text: "Settings",
      to: "/dashboard/settings",
      icon: <RiSettings5Line />,
      activeIcon: <RiSettings5Fill className="text-xl" />,
    },
  ];

  const admin = [
    {
      id: 1,
      text: "Dashboard",
      to: "/dashboard",
      icon: <BsGrid />,
      activeIcon: <BsFillGridFill className="text-xl" />,
    },
    {
      id: 2,
      text: "Exams",
      to: "/dashboard/exams",
      icon: <BsFileText />,
      activeIcon: <BsFileTextFill className="text-xl" />,
    },
    {
      id: 3,
      text: "Questions",
      to: "/dashboard/exam-bank",
      icon: <BsBriefcase />,
      activeIcon: <BsBriefcaseFill className="text-xl" />,
    },
    {
      id: 4,
      text: "Candidates",
      to: "/dashboard/candidates",
      icon: <HiOutlineUserGroup />,
      activeIcon: <HiUserGroup className="text-xl" />,
    },
    {
      id: 6,
      text: "Results",
      to: "/dashboard/results",
      icon: <BsFileEarmarkText />,
      activeIcon: <BsFileEarmarkTextFill className="text-xl" />,
    },
  ];

  return (
    <div className="w-72 px-8 py-4 flex flex-col justify-between items-center h-screen bg-white shadow-md">
      <nav className="w-full flex flex-col items-center">
        <div className="">
          <img
            src={logo}
            alt="app logo"
            className="md:h-16 md:w-16 lg:h-24 lg:w-24"
          />
        </div>
        <h1 className="uppercase font-bold text-2xl text-blue-900">
          {appName}
        </h1>
      </nav>
      <nav className="w-full h-full flex items-center justify-center overflow-hidden">
        <ul className="flex h-[450px] flex-col justify-center gap-1 overflow-x-hidden px-2 overflow-y-auto">
          {userDetails?.role === "SA"
            ? sa.map((link) => (
              <li key={link.id}>
                <Link
                  onClick={() => handleLinkClick(link.to)}
                  to={link.to}
                  className={`flex items-center gap-3 w-full capitalize font-bold text-left px-4 py-2 rounded-md focus:outline-none ${link.to === selected
                    ? "text-blue-900 bg-slate-100 shadow-md"
                    : "text-gray-400"
                    }`}
                >
                  {link.to === selected ? link.activeIcon : link.icon}
                  {link.text}
                </Link>
              </li>
            ))
            : userDetails?.role === "ADMIN"
              ? admin.map((link) => (
                <li key={link.id}>
                  <Link
                    onClick={() => handleLinkClick(link.to)}
                    to={link.to}
                    className={`flex items-center gap-3 w-full capitalize font-bold text-left px-4 py-2 rounded-md focus:outline-none ${link.to === selected
                      ? "text-blue-900 bg-slate-100 shadow-md"
                      : "text-gray-400"
                      }`}
                  >
                    {link.to === selected ? link.activeIcon : link.icon}
                    {link.text}
                  </Link>
                </li>
              ))
              : null}
        </ul>
      </nav>
      <nav className="w-full">
        <button
          onClick={handleLogout}
          className="border-2 px-10 py-2 text-red-400 font-bold border-red-400 hover:bg-red-500 hover:text-white rounded-md"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
