import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl  } from "../../config";
import { Loader } from "../Loader/loader";
import { useDispatch } from "react-redux";
import {AddNewAdmin} from "../../StoreRedux/alladminSlice"
import Alladmins from "../Sidebar Pages/alladmins/Alladmins"
 const NewAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false)
  const dispatch=useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setloading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/admin/signup`, {
        email,
        password,
      });
      if (response && response.status === 200) {
        dispatch(AddNewAdmin(response.data.admin))
        console.log("success" , response)
        setloading(false);
        toast.success("Admin created successfully")

        setEmail("")
        setPassword("")
      }
    } catch (error) {
      setloading(false);
      if (error.response) {
        console.log(error);
        setError(error.response.message)
        toast.error("Failed to Create Admin")
      } else {
        console.log("Failed to login: Invalid credentials");

      }
    }
  
  };

  return (
    <div>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Admin
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Admin
          </button>
        </div>
      </form>
      <Loader loading={loading} />  
    </div>
      <Alladmins/>
    </div>
  );
};

export default NewAdmin;
