import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import imageCompression from 'browser-image-compression';
import {serverUrl} from "../../../config"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddNewfood} from "../../../StoreRedux/foodSlice";
const Addfood = () => {
    // const [selectedValue, setSelectedValue] = useState('');
    const [edu, setEdu] = useState({ title: '' });
    const [content, setContent] = useState('');
    const [loader, setLoader] = useState(false);
    const [Image, setImage] = useState();
    const editor = React.useRef(null);
    const dispatch=useDispatch();


    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };


    const cloudName = 'dxtbs0yyv'; 
    const uploadPreset = 'zuifyjrj'; 

    const handleImageSelect = async (filename) => {
        const file = filename;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'blog');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData); // Changed the URL endpoint for image uploads
                console.log("upload")
             return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error);
            return "";
        }
    };

    const submit = async(e) => {
        e.preventDefault();
        let compressedFile1=null;
        let imageUrl=null;
        try{
            setLoader(true)
            if(Image){
                 compressedFile1 = await imageCompression(Image, options);
                 imageUrl= await handleImageSelect(compressedFile1);
            }
    
            const response = await axios.post(`${serverUrl}/api/blog/createBlog`, {
                title:edu.title, description:content, imageUrl:imageUrl 
            })
            console.log(response)
            if (response && response.status === 200) {
                setLoader(false);
                dispatch(AddNewfood(response.data.data))
                console.log(response.data.data)
                toast.success(response.data.message);
                setEdu("")
                setContent("")

                // setaddbook(doorinitial);
            }
        }catch(error){
            setLoader(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }

    };


    const onimage = (e) => {
        setImage(e.target.files[0])
    };

    const onchange = (e) => {
        const { name, value } = e.target;
        setEdu({ ...edu, [name]: value });
    };

    return (
        <form onSubmit={submit}>


            <div className="mb-4">
                <label htmlFor="Image" className="block text-gray-700 text-sm font-bold mb-2 form-label-urdu">Image</label>
                <input type="file" required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="Image" accept="image/png, image/jpeg" name='Image' onChange={onimage} />
            </div>

            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2 form-label-urdu">Tile</label>
                <input type="text" required className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" name='title' onChange={onchange} id="title" value={edu.title} placeholder="Enter the Title" />
            </div>

            <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <JoditEditor
                    className="w-full border rounded-md"
                    ref={editor}
                    value={content}
                    required
                    onBlur={newContent => setContent(newContent)}
                    onChange={() => { }}
             
                />
            </div>

            <button type="submit" className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${loader === true ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loader === true}>
                {loader === true ? (
                    <span>
                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        Uploading...
                    </span>
                ) : "Submit"}
            </button>
        </form>
    );
};

export default Addfood;
