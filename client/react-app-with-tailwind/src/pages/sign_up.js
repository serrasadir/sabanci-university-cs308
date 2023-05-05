import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'


export const SignUpPage = () => {
    return ( 
        <div className="signup">
          <Register/>
        </div>
        );
}



const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    
    const onSubmit = async (event) => {
        event.preventDefault();

        try 
        {
          
           const response = await axios.post("http://localhost:3001/auth/register", {
            email,
            username,
            password,
           }); 
          if(response.data.message === "Username already exists!")    
          {     
            alert("Username already exist");
          }    
          else if(response.data.message === "Email already exists!")
          {
            alert("Email already exist.");
          }    
          else
          {
            navigate("/login"); 
          } 
        }
        catch(err) 
        {
          console.error(err);
        }
    };

    return (
       <Formregister
       email={email}
       setEmail={setEmail}
       username={username} 
       setUsername={setUsername} 
       password={password} 
       setPassword={setPassword}
       onSubmit={onSubmit}
       />
    );
};


const Formregister = ({email, setEmail, username, setUsername, password, setPassword, onSubmit}) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create an account
          </h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-2">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="appearance-none rounded-md bg-gray-100 py-2 px-3 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="appearance-none rounded-md bg-gray-100 py-2 px-3 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              placeholder="Email address"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="appearance-none rounded-md bg-gray-100 py-2 px-3 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-md focus:outline-none focus:shadow-outline hover:from-indigo-400 hover:to-purple-400"
            >
              <span className="flex items-center justify-center">
                <LockClosedIcon className="w-5 h-5 mr-2" />
                Create Account
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    )
 }
              


