import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import "../App.css"



export const LoginPage = () => {

    return ( 
        <div className="login">
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

            if (response.data.message == "User does not exist!")
            {
                alert("User does not exist!");
            }
            else if (response.data.message == "Username or Password is Incorrect!") 
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
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png"
                alt="Your Company"
              />
              <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login to your account
              </h2>
              
            </div>
            <form onSubmit={onSubmit}>
              
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)}                  
                    required
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
    )
 }













