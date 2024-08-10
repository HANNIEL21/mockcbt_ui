import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseApiUrl } from "../../utils/constants";
import { logout, setIsAuthenticatedFalse } from "../../redux/Features/Auth";
import Table from "../../components/Table";
import { IoPerson, IoArrowBackOutline, IoLogOutOutline } from "react-icons/io5";
import Alert from "../../components/Alert";

const CandidateResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setResult([]);
      try {
        console.log(userDetails?.examno);
        const res = await axios.get(
          `${baseApiUrl}/result.php?id="${userDetails?.examno}"`
        );
        console.log(res.data);
        setResult(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [userDetails?.examno]);

  console.log(userDetails);
  console.log(result);

  const handleLogout = async () => {
    const username = userDetails?.examno;
    const res = await axios.put(`${baseApiUrl}/login.php`, {
      username,
    });
    console.log(res);
    if (res.data.status === "success") {
      dispatch(logout());
      Alert(res.data.status, res.data.message);
      navigate("/");
    }

    return;
  };

  const columns = [
    {
      name: "ID",
      width: "60px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "EXAM",
      selector: (row) => row.exam,
      sortable: true,
    },
    {
      name: "COURSE",
      width: "200px",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: userDetails.s1.toUpperCase(),
      selector: (row) => row.s1,
      sortable: true,
    },
    {
      name: userDetails.s2.toUpperCase(),
      selector: (row) => row.s2,
      sortable: true,
    },
    {
      name: userDetails.s3.toUpperCase(),
      selector: (row) => row.s3,
      sortable: true,
    },
    {
      name: userDetails.s4.toUpperCase(),
      selector: (row) => row.s4,
      sortable: true,
    },
    {
      name: "SCORE",
      selector: (row) => row.score,
      sortable: true,
    },
  ];

  return (
    <main className="p-10">
      <div>
        <button
          onClick={() => navigate("/candidate")}
          className=" absolute top-8 left-4 text-blue-900 rounded-full px-4 py-2"
        >
          <IoArrowBackOutline className="text-2xl" />
        </button>
        <button
          onClick={handleLogout}
          className=" absolute top-8 right-4 rounded-full px-4 py-2 capitalize text-red-700 font-bold flex items-center gap-3"
        >
          logout <IoLogOutOutline className="text-2xl" />
        </button>
      </div>
      <section className="flex items-center gap-8 p-8">
        <div className="h-44 w-44 flex items-center justify-center">
          {userDetails?.avatar ? (
            <img
              src={`${baseApiUrl}/images/${userDetails?.avatar}`}
              alt="User Avatar"
              className="w-full h-full rounded-lg shadow-md"
            />
          ) : (
            <div className="bg-white shadow-md rounded-xl h-52 w-52 flex items-center justify-center">
              <IoPerson className="text-blue-800 text-6xl" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl text-blue-900 font-extrabold uppercase">
            {userDetails?.firstname} {userDetails?.lastname}
          </h1>
          <p className="font-extrabold capitalize">{userDetails?.course}</p>
          <p className="font-extrabold capitalize">{userDetails?.examno}</p>
          <p className="font-extrabold capitalize hidden">
            {userDetails?.token}
          </p>
        </div>
      </section>
      <section className="">
        <Table label={columns} data={result} filter={"score"} />
      </section>
    </main>
  );
};

export default CandidateResult;
