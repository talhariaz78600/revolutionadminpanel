import React, { useState ,useEffect} from 'react';
import axios from "axios"
import { serverUrl} from "../../config";
import { toast } from "react-toastify";
import { Loader } from "../Loader/loader";
const SocialMedia = () => {
  // State variables for social media URLs
  const [loading, setloading] = useState(false)
  const [twitterUrl, setTwitterUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobile] = useState('');
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Updated social media URLs:', {
      twitterUrl,
      facebookUrl,
      instagramUrl,
      telegramUrl
    });
    setloading(true);

    try {
        const response = await axios.put(`${serverUrl}/api/media/update/6675a719b8c9d030b95645ec`,{
            twitterUrl,
            facebookUrl,
            instagramUrl,
            telegramUrl,
            email,
            mobileno,
            open,
            close
          });
        if (response && response.status === 200) {
          console.log("success" , response)
          setTwitterUrl(response.data.data.twitterUrl)
          setFacebookUrl(response.data.data.facebookUrl)
          setInstagramUrl(response.data.data.instagramUrl)
          setEmail(response.data.data.email)
          setMobile(response.data.data.mobileno)
          setTelegramUrl(response.data.data.telegramUrl)
          setOpen(response.data.data.open)
          setClose(response.data.data.close)
          toast.success("Successfully updated")
          setloading(false);
        }
      } catch (error) {
        setloading(false);
        if (error.response) {
          console.log(error);
          toast.error("Failed to update")
          setError(error.response.message)
      
        } else {
          console.log("Failed to login: Invalid credentials");
  
        }
      }
    setError('');
  };
  const fetchdata=async()=>{
    try {
        const response = await axios.get(`${serverUrl}/api/media/getsinglemedia/6675a719b8c9d030b95645ec`);
        if (response && response.status === 200) {
          console.log("success" , response)
          setTwitterUrl(response.data.data.twitterUrl)
          setFacebookUrl(response.data.data.facebookUrl)
          setInstagramUrl(response.data.data.instagramUrl)
          setTelegramUrl(response.data.data.telegramUrl)
          setEmail(response.data.data.email)
          setMobile(response.data.data.mobileno)
          setOpen(response.data.data.open)
          setClose(response.data.data.close)
        }
      } catch (error) {
        
        if (error.response) {
          console.log(error);
          setError(error.response.message)
      
        } else {
          console.log("Failed to login: Invalid credentials");
  
        }
      }
  }

  useEffect(()=>{
    fetchdata();
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Social Media Settings
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitter">
            Twitter URL
          </label>
          <input
            id="twitter"
            type="text"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Twitter URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">
            Facebook URL
          </label>
          <input
            id="facebook"
            type="text"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Facebook URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">
            Instagram URL
          </label>
          <input
            id="instagram"
            type="text"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Instagram URL"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram">
            Telegram URL
          </label>
          <input
            id="telegram"
            type="text"
            value={telegramUrl}
            onChange={(e) => setTelegramUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Telegram URL"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram">
            Email
          </label>
          <input
            id="telegram"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram">
            Mobile No
          </label>
          <input
            id="telegram"
            type="text"
            value={mobileno}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Mobile No"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram">
            Open
          </label>
          <input
            id="open"
            type="text"
            value={open}
            onChange={(e) => setOpen(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Opening days of week"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram">
            Close
          </label>
          <input
            id="close"
            type="text"
            value={close}
            onChange={(e) => setClose(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Closing days of week"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
      </form>
      <Loader loading={loading} />
    </div>
  );
};

export default SocialMedia;
