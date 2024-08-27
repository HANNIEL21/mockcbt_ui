import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseApiUrl, appName } from '../../utils/constants';
import Alert from '../../components/Alert';
import { subjects } from '../../engine_config';
import { setUserDetails } from '../../redux/Features/User';
import { IoArrowBackOutline, IoLogOutOutline } from "react-icons/io5";
import { logout } from '../../redux/Features/Auth';
import { setExamDetails, setQuestions } from '../../redux/Features/Exam';

const Subject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user);
    let examDetails = null;

    const [formData, setFormData] = useState({
        s1: '',
        s2: '',
        s3: '',
        s4: '',
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
                    // setError('Failed to fetch user data');
                }
            } catch (error) {
                Alert("error", "An error occurred while fetching user data");
                // setError('An error occurred while fetching user data');
            }
        };

        fetchUserData();

    }, [userDetails.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
    }

    const handleProceed = async () => {
        try {
            const data = { ...userDetails, ...formData }
            const res = await axios.put(`${baseApiUrl}/candidate.php?id=${userDetails.id}`, data);
            console.log(res.data);
            if (res.data.status === "success") {
                Alert(res.data.status, res.data.message);
                dispatch(setUserDetails(res.data.data));
                // navigate("/candidate");
                handleStartExam();
            } else {
                Alert(res.data.status, res.data.message);
                return;
            }
        } catch (error) {
            console.log(error);
            Alert("error", error.message);
        }
    };

    const handleStartExam = async () => {
        try {
            dispatch(setQuestions([]));
            const res = await axios.get(`${baseApiUrl}/exam.php`);

            console.log(res.data, "EXAM DATA");

            // check for reoccurring exam
            const reoccurringExam = res.data.filter(
                (exam) =>
                    exam.category === "Multi Choice - Multi Attempt" &&
                    exam.group === userDetails?.group
            );

            if (reoccurringExam.length > 0) {
                examDetails = reoccurringExam[0];
                dispatch(setExamDetails(examDetails));
                const today = new Date();
                const expire = new Date(examDetails?.end);

                if (expire.toDateString() === today.toDateString()) {
                    Alert("info", "Exam Ended");
                    return;
                }

                const sub = {
                    id: examDetails?.exam_id,
                    sub1: userDetails?.s1,
                    sub2: userDetails?.s2,
                    sub3: userDetails?.s3,
                    sub4: userDetails?.s4,
                };

                const res = await axios.post(`${baseApiUrl}/start.php`, sub);

                if (res.data.status === "success") {
                    const questions = res.data.questions;

                    // Group the questions by course
                    const groupedQuestions = {};
                    questions.forEach((question) => {
                        if (!groupedQuestions[question.course]) {
                            groupedQuestions[question.course] = [];
                        }
                        groupedQuestions[question.course].push(question);
                    });

                    // Shuffle the groups
                    const shuffledGroups = Object.values(groupedQuestions);
                    for (let i = shuffledGroups.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledGroups[i], shuffledGroups[j]] = [
                            shuffledGroups[j],
                            shuffledGroups[i],
                        ];
                    }

                    // Flatten the array
                    const shuffledQuestions = shuffledGroups.flat();

                    console.log(shuffledQuestions);
                    dispatch(setQuestions(shuffledQuestions));
                } else {
                    Alert(res.data.status, res.data.message);
                }
                navigate(`/instruction/${examDetails?.exam_id}`);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div>
                <button onClick={() => navigate('/candidate')} className=" absolute top-8 left-4 text-blue-900 rounded-full px-4 py-2">
                    <IoArrowBackOutline className='text-2xl' />
                </button>
                <button onClick={handleLogout} className=" absolute top-8 right-4 rounded-full px-4 py-2 capitalize text-red-700 font-bold flex items-center gap-3">
                    logout <IoLogOutOutline className='text-2xl' />
                </button>
            </div>
            <div className='md:w-[50%] md:h-[350px] bg-green-500 p-4 gap-10 flex justify-between items-center flex-col text-center'>
                <h1 className='text-6xl font-extrabold text-blue-900 uppercase'>{appName}</h1>
                <p>Select Subject Combination to Proceed</p>


                <form action="" className='w-full flex flex-col gap-3'>
                    <div className='w-full grid grid-cols-2 gap-3'>
                        {[1, 2, 3, 4].map((num) => (
                            <div className="w-full" key={num}>
                                <label htmlFor={`s${num}`} className="sr-only">SUBJECT {num}</label>
                                <select
                                    name={`s${num}`}
                                    id={`s${num}`}
                                    className="w-full bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-3 px-2 text-blue-900 uppercase text-sm font-extrabold shadow-md"
                                    onChange={handleChange}
                                    value={formData[`s${num}`]}
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
    )
}

export default Subject