import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/rsu-logo.png";
import { setUserDetails } from "../../redux/Features/User";
import { clearAuthState, setUsername, setError, setIsAuthenticatedTrue, } from "../../redux/Features/Auth";
import { baseApiUrl, appName } from '../../utils/constants';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, isError } = useSelector((state) => state.auth);
    const username = user.username;

    useEffect(() => {
        dispatch(clearAuthState());
        console.log(user);
    }, [dispatch])

    const handleLogin = async () => {
        try {
    
            const response = await axios.post(`${baseApiUrl}/login.php`, { username });
            console.log('User details:', response.data);
            dispatch(setUserDetails(response.data));
    
            const userRole = response.data.role;
            if (userRole === "ADMIN" || userRole === "EXAMINER") {
                navigate("/password");
            } else if (userRole === "USER") {
                dispatch(setIsAuthenticatedTrue());
                navigate("/candidate");
            } else {
                throw new Error("Invalid user credential");
            }
        } catch (error) {
            if (error.response) {
                // Request was made and server responded with a status code that falls out of the range of 2xx
                console.error('Error message:', error.response.data.message);
                dispatch(setError(error.response.data.message));
            } else if (error.request) {
                // Request was made but no response was received
                console.error('No response received:', error.request);
                dispatch(setError('No response received from the server'));
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', error.message);
                dispatch(setError(error.message));
            }
        }
    };
    


    return (
        <main className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className='w-2/4 h-full bg-white flex justify-center items-center'>
                <img src={logo} alt="rsu logo" className='w-[50%] h-[40%]' />
            </div>
            <div className='w-3/4 flex justify-center items-center'>
                <div className='w-[50%] h-[350px] p-4 flex justify-between items-center flex-col text-center'>
                    <h1 className='text-6xl font-extrabold text-blue-900 uppercase'>{appName}</h1>
                    <input
                        type="text"
                        placeholder='Reg Number'
                        className='w-[80%] bg-transparent border-2 outline-none focus:outline-blue-900 rounded-md p-3 text-lg font-bold text-blue-900 shadow-md'
                        // value={username}
                        onChange={(e) => {
                            dispatch(setUsername(e.target.value));
                        }}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <button  className=' block w-[70%] border-2 rounded-md border-blue-900 hover:bg-blue-900 font-extrabold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md' onClick={handleLogin}>
                        LOGIN
                    </button>
                    {/* Display login error message */}
                    {isError && <p className="text-red-500">{error}</p>}
                    <Link to="/signup" className='font-bold text-blue-900'>Create Account</Link>

                </div>
            </div>
        </main>
    );
}

export default Auth;
