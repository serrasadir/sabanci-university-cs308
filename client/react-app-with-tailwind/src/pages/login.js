


import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import "../App.css"

export const LoginPage = () => {
    return ( 
        <div className="bg-gray-100 min-h-screen">
          <Login/>
        </div>
    );
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault();

        try
        {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            if (response.data.message === "User does not exist!")
            {
                alert("User does not exist!");
            }
            else if (response.data.message === "Username or Password is Incorrect!") 
            {
                alert("Username or Password is Incorrect!");
                <pass_wrong/>
            }
            else
            {
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                window.localStorage.setItem("username", response.data.user1);
                navigate("/");
            }

        }
        catch(err)
        {
          console.error(err);
        }
    };

    return (
       <Formlogin
       username={username} 
       setUsername={setUsername} 
       password={password} 
       setPassword={setPassword}
       onSubmit={onSubmit}
       />
    );
};

const Formlogin = ({username, setUsername, password, setPassword, onSubmit}) => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-light-blue">
        <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img className="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png" alt="Your Company" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
              Login to Your Account
            </h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="block w-full px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="block w-full px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-dark-blue text-white font-bold rounded-md focus:outline-none focus:shadow-outline hover:bg-button-blue"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    )
 }






                
