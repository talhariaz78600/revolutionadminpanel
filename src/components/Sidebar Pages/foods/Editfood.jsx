import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../config";
// import { Loader } from "../../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { updatefoods, selectfoods } from "../../../StoreRedux/foodSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
// import { PDFDocument } from 'pdf-lib';
const Editfood = () => {
 
    const [edu, setEdu] = useState({ title: '' });
    const [content, setContent] = useState('');
    const [loader, setLoader] = useState(false);
    const {blogId}=useParams();
    const editor = React.useRef(null);
    const dispatch=useDispatch();
    const allblogs=useSelector(selectfoods);
    const host =useNavigate()



    useEffect(()=>{
        if(allblogs.length>0){
       const data= allblogs.find((item)=>item._id===blogId)
       console.log(data);
       setEdu({title:data.title})
       setContent(data.description)
     }
       // eslint-disable-next-line
    },[allblogs])

    const submit = async(e) => {
        e.preventDefault();
        try{
            setLoader(true)
      
    
            const response = await axios.put(`${serverUrl}/api/blog/update/${blogId}`, {
                title:edu.title, description:content
            })
            console.log(response)
            if (response && response.status === 200) {
                setLoader(false);
                dispatch(updatefoods(response.data.data))
                console.log(response.data.data)
                toast.success(response.data.message);
                host("/Admin/blogs")
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
    const onchange = (e) => {
        const { name, value } = e.target;
        console.log(value);
   
        setEdu({ ...edu, [name]: value });
    };
    return (
        <div>
       {allblogs&&<form onSubmit={submit}>
        <h1 className="text-center m-4 font-bold text-xl">Edit Blog</h1>
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
                ) : "Update"}
            </button>
        </form>}

        </div>
    );
};

export default Editfood;