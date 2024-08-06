import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/rsu-logo.png";
import { setUserDetails } from "../../redux/Features/User";
import { clearAuthState, setUsername, setError, logout, setIsAuthenticatedFalse } from "../../redux/Features/Auth";
import { baseApiUrl, appName } from '../../utils/constants';
import Alert from '../../components/Alert';
import { IoArrowBackOutline, IoLogOutOutline } from "react-icons/io5";

const Select = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        faculty: "",
        c1: '',
        c2: '',
        c3: '',
        c4: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/candidate.php?id=${userDetails.id}`);
                if (response.status === 200) {
                    const userData = response.data;
                    setFormData(userData);
                    console.log();

                } else {
                    Alert("error", "Failed to fetch user data");
                    setError('Failed to fetch user data');
                }
            } catch (error) {
                Alert("error", "An error occurred while fetching user data");
                setError('An error occurred while fetching user data');
            }
        };

        fetchUserData();

    }, [userDetails.id]);

    const faculties = [
        {
            name: "Faculty of Agriculture", subjects: [
                "English Language",
                "Biology",
                "Chemistry",
                "Agricultural Science"
            ]
        },
        {
            name: "Faculty of Engineering", subjects: [
                "English Language",
                "Mathematics",
                "Chemistry",
                "Physics"
            ]
        },
        {
            name: "Faculty of Science", subjects: [
                "English Language",
                "Mathematics",
                "Chemistry",
                "Physics"
            ]
        },
        {
            name: "Faculty of Law", subjects: [
                "English Language",
                "Literature in English",
                "Government",
                "Economics"
            ]
        },
        {
            name: "Faculty of Education", subjects: [
                "English Language",
                "Biology",
                "Mathematics",
                "Physics"
            ]
        },
    ];

    const selectedFaculty = faculties.find(faculty => faculty.name === formData.faculty);
    const subjects = selectedFaculty ? selectedFaculty.subjects : [];

    const handleProceed = async () => {
        try {
            const data = { ...userDetails, ...formData }
            const res = await axios.put(`${baseApiUrl}/candidate.php?id=${userDetails.id}`, data);
            console.log(res.data);
            if (res.data.status === "success") {
                Alert(res.data.status, res.data.message);
                dispatch(setUserDetails(res.data.data));
                navigate("/candidate");
            } else {
                Alert(res.data.status, res.data.message);
                return;
            }
        } catch (error) {
            console.log(error);
            Alert("error", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <main className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <button onClick={() => {
                dispatch(logout());
                dispatch(setIsAuthenticatedFalse());
                navigate('/');
            }} className=" absolute top-8 right-4 rounded-full px-4 py-2 capitalize text-red-700 font-bold flex items-center gap-3">
                logout <IoLogOutOutline className='text-2xl' />
            </button>
            <div className='w-2/4 h-full bg-white flex justify-center items-center'>
                <img src={logo} alt="rsu logo" className='w-[50%] h-[40%]' />
            </div>
            <div className='w-3/4 flex justify-center items-center'>
                <div className='w-[50%] h-[350px] p-4 gap-10 flex justify-between items-center flex-col text-center'>
                    <h1 className='text-6xl font-extrabold text-blue-900 uppercase'>{appName}</h1>

                    <form action="" className='w-full flex flex-col gap-3'>
                        <div className="w-full">
                            <label htmlFor="faculty" className="sr-only">FACULTY</label>
                            <select
                                name="faculty"
                                id="faculty"
                                className="w-full bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-3 px-2 text-blue-900 uppercase text-sm font-extrabold shadow-md"
                                onChange={handleChange}
                                value={formData.faculty}
                            >
                                <option value="">FACULTY</option>
                                {faculties.map((item, i) => (
                                    <option key={i} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full grid grid-cols-2 gap-3'>
                            {[1, 2, 3, 4].map((num) => (
                                <div className="w-full" key={num}>
                                    <label htmlFor={`c${num}`} className="sr-only">COURSE {num}</label>
                                    <select
                                        name={`c${num}`}
                                        id={`c${num}`}
                                        className="w-full bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-3 px-2 text-blue-900 uppercase text-sm font-extrabold shadow-md"
                                        onChange={handleChange}
                                        value={formData[`c${num}`]}
                                    >
                                        <option value="">SUBJECT {num}</option>
                                        {subjects.map((subject, i) => (
                                            <option key={i} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </form>
                    <button className=' block w-full border-2 rounded-md border-blue-900 hover:bg-blue-900 font-extrabold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md' onClick={handleProceed}>
                        PROCEED
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Select;
