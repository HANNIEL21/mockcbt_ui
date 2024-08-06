import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/rsu-logo.png";
import { setUserDetails } from "../../redux/Features/User";
import { clearAuthState, setError, setIsAuthenticatedTrue, } from "../../redux/Features/Auth";
import { baseApiUrl, appName } from '../../utils/constants';
import { gender } from '../../engine_config';
import Alert from '../../components/Alert';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearAuthState());
    }, [dispatch])

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        password: '',
        confirm_password: '',
        role: "USER",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async () => {
        if (formData.password !== formData.confirm_password) {
            dispatch(setError('Password does not match'));
            return
        }

        try {
            const res = await axios.post(`${baseApiUrl}/auth.php`, formData);
            console.log(res.data.status);
            if (res.status === 200) {
                if (res.data.status === "success") {
                    Alert(res.data.status, res.data.message);
                    dispatch(setUserDetails(res.data.data));
                    navigate('/token');
                } else {
                    Alert(res.data.status, res.data.message);
                    dispatch(setError(res.data.message));
                    return;
                }
            } else {
                // dispatch(setError(res.data.message));
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <main className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className='w-2/4 h-full bg-white flex justify-center items-center'>
                <img src={logo} alt="rsu logo" className='w-[50%] h-[40%]' />
            </div>
            <div className='w-3/4 flex justify-center items-center'>
                <div className=' p-4 flex gap-10 justify-between items-center flex-col text-center'>
                    <h1 className='text-6xl font-extrabold text-blue-900 uppercase'>{appName}</h1>
                    <form className="grid grid-cols-2 gap-3">
                        <div className="w-full">
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder='Firstname'
                                onChange={handleChange}
                                className='bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold placeholder:text-blue-900 placeholder:uppercase placeholder:text-sm placeholder:font-extrabold text-blue-900 shadow-md'
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder='Lastname'
                                onChange={handleChange}
                                className='bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold placeholder:text-blue-900 placeholder:uppercase placeholder:text-sm placeholder:font-extrabold text-blue-900 shadow-md'

                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="email"
                                placeholder='Email'
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className='bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold placeholder:text-blue-900 placeholder:uppercase placeholder:text-sm placeholder:font-extrabold text-blue-900 shadow-md'

                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="gender" className="sr-only">GENDER</label>
                            <select
                                name="gender"
                                id="gender"
                                onChange={handleChange}
                                className="w-full bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-3 px-2 text-blue-900 uppercase text-sm font-extrabold shadow-md"
                            >
                                <option value="" className='uppercase text-sm font-extrabold p-2'>gender</option>
                                {gender.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                            </select>
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='password'
                                onChange={handleChange}
                                className='bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold placeholder:text-blue-900 placeholder:uppercase placeholder:text-sm placeholder:font-extrabold text-blue-900 shadow-md'

                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder='confirm password'
                                onChange={handleChange}
                                className='bg-white border-2 outline-none focus:outline-blue-900 rounded-md p-2 text-lg font-bold placeholder:text-blue-900 placeholder:uppercase placeholder:text-sm placeholder:font-extrabold text-blue-900 shadow-md'

                            />
                        </div>
                    </form>
                    <button className=' block w-[70%] border-2 rounded-md bg-blue-800 border-blue-900 hover:bg-blue-900 font-extrabold text-xl text-white px-10 py-2 shadow-md' onClick={handleSignup}>
                        Create Account
                    </button>
                    {/* Display login error message */}
                    {isError && <p className="text-red-500">{error}</p>}
                    <Link to="/" className='font-bold text-blue-900'>Login</Link>
                </div>
            </div>
        </main>
    );
}

export default Signup;
