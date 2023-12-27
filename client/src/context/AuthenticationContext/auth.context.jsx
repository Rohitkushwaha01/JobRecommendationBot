import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    let [isAuthenticated, setAuthenticated] = useState(false);
    let [currentUser, setCurrentUser] = useState({})
    let [currentUserDetails, setCurrentUserDetails] = useState({});
    let [chat, setChat] = useState([]);
    let [chatResponse, setChatResponse] = useState([]);

    let currentUserName = ""

    if (localStorage.getItem('token')) {
        currentUserName = jwtDecode(localStorage.getItem('token')).user.name
    }

    useEffect(() => {
        const checkAuthentication = async () => {
          const token = localStorage.getItem('token');
    
          if (token) {
            setAuthenticated(true)
          } else {
            setAuthenticated(false)
            handleLogout();
          }
        };
    
        checkAuthentication();
    
        const handleBeforeUnload = (event) => {
            const confirmationMessage = 'Are you sure you want to leave?';
      
            // Display the confirmation message in modern browsers
            event.returnValue = confirmationMessage;
      
            // Display the confirmation message in legacy IE
            return confirmationMessage;
          };
      
          const handleUnload = () => {
            // Perform additional cleanup or actions before the page is unloaded
            // ...
      
            // Optional: Perform the logout action
            handleLogout();
          };
      
          // Attach the beforeunload event listener
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          // Attach the unload event listener
          window.addEventListener('unload', handleUnload);
      
          // Cleanup the event listeners when the component unmounts
          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
          };
      }, []);

    const register = async (name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ name, email, password })
        console.log(body)
        setCurrentUser({ name, email });

        try {
            const res = await axios.post('http://localhost:3000/api/user', body, config)
            localStorage.setItem('token', res.data.token);
            setAuthenticated(true)
        }
        catch (err) {
            console.log(err);
            console.log(err.response.data.errors[0])
            return err.response.data.errors[0].message;
        }
    }


    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        const body = JSON.stringify({ email, password });
        setCurrentUser({ email, password });

        try {
            const res = await axios.post('http://localhost:3000/api/auth/', body, config);
            localStorage.setItem('token', res.data.token);
            setAuthenticated(true);
            return res.data;
        }
        catch (err) {
            console.log(err);
            console.log(err.response.data.errors[0].message)
            return err.response.data.errors[0].message
        }

    }

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        setAuthenticated(false)
    }

    const userDetails = async (
        fname,
        lname,
        dateOfBirth,
        gender,
        email,
        mobileNo,
        city,
        jobLocation,
        educationLevel,
        fieldOfStudy,
        graduationYear,
        technicalSkill,
        interests,
        jobRole,
        jobType,
        salary) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        const body = JSON.stringify({
            fname,
            lname,
            dateOfBirth,
            gender,
            email,
            mobileNo,
            city,
            jobLocation,
            educationLevel,
            fieldOfStudy,
            graduationYear,
            technicalSkill,
            interests,
            jobRole,
            jobType,
            salary
        })

        // console.log(body)

        try {
            console.log('Request Body:', body);
            const res = await axios.post('http://localhost:3000/api/userdetails/', body, config);
            console.log(res.data)
            setCurrentUserDetails(res.data)
            console.log(currentUserDetails)
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const fullUserInfo = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        const userId = jwtDecode(localStorage.getItem('token')).user.id
        try {
            const res = await axios.get(`http://localhost:3000/api/userdetails/`, config);
            setCurrentUserDetails(res.data);

            return res.data;
        }
        catch (err) {
            console.log(err);
            console.log(err.response.data.errors[0])
            return err.response.data.errors[0].message;
        }
    }


    const chatting = async (userInput) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        setChat((prevChat) => [...prevChat, { user: 'You', text: userInput }]);
        const body = JSON.stringify({ userInput });
        console.log(body)
        try {
            const res = await axios.post('http://localhost:3000/api/chatbot/', body, config);
            setChatResponse((prevChat) => [...prevChat, { user: 'Chatbot', text: res.data }]);
            return res.data;
        }
        catch (err) {
            console.log(err);
            console.log(err.response.data.errors[0].message)
            return err.response.data.errors[0].message
        }

    }
   


    return (
        <AuthContext.Provider
            value={{
                register,
                login,
                handleLogout,
                userDetails,
                fullUserInfo,
                setAuthenticated,
                setChat,
                setChatResponse,
                chatting,
                chat,
                chatResponse,
                currentUserName,
                isAuthenticated,
                currentUser,
                currentUserDetails,
            }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;