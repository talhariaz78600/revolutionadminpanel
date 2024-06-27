import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch } from "react-redux";
import { AddNewproduct } from "../../../StoreRedux/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Addproduct = () => {
    const host=useNavigate();
    const dispatch = useDispatch()
    const doorinitial = {
        title:"", price:"",hostingfee:"",condition:"",image:"",power:"",machines:"",producttype:"",monthlysupport:"",installation:"",deposit:""
    }
    const Doorerror = {
        title:"", price:"",hostingfee:"" ,condition:"",image:"",power:"",machines:"",producttype:"",monthlysupport:"",installation:"",deposit:""
    }
    const [error, setError] = useState(Doorerror);
    const [addproduct, setaddproduct] = useState(doorinitial);
    const [loading, setloading] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setError((prevError) => ({ ...prevError, [name]: `Required` }));
        } else {
            setError((prevError) => ({ ...prevError, [name]: "" }));
        }

        setaddproduct((prev) => ({ ...prev, [name]: value }))
    }
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
        formData.append('folder', 'product');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData); // Changed the URL endpoint for image uploads
                console.log("upload")
             return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error);
            return "";
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(addproduct)
        try {
            setloading(true);
            const img= await imageCompression(addproduct.image,options)
             const data=await handleImageSelect(img)
            const response = await axios.post(`${serverUrl}/api/product/createProduct`, {
                title:addproduct.title, price:parseInt(addproduct.price),hostingfee:parseInt(addproduct.hostingfee),condition:addproduct.condition,imageUrl:data,power:addproduct.power,machines:addproduct.machines,producttype:addproduct.producttype,installation:parseInt(addproduct.installation),monthlysupport:parseInt(addproduct.monthlysupport),
            });
            console.log(response)
            if (response && response.status === 200) {
                setloading(false);
                dispatch(AddNewproduct(response.data.data))
                console.log(response.data.data)
                toast.success(response.data.message);
                host(`/Admin/product/${response.data.data.producttype}`)
                setaddproduct(doorinitial);
            }
        } catch (error) {
            setloading(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

  

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="space-y-12 h-screen">
                    <div>
                        <h2 className="text-3xl mt-4 font-bold tracking-tight text-purple-900 sm:text-4xl">
                            Add Product
                        </h2>
                        <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">
                        <div className=" col-sapn-3 sm:col-span-1">
                                <label htmlFor="title" className="block text-md font-medium leading-6 text-purple-900">
                                    Product Type
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleChangeInput}
                                        required
                                        name="producttype"
                                        value={addproduct.producttype}
                                       
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select product type</option>
                                        <option value="special">Special</option>
                                        <option value="equipment">Equipment</option>
                                    </select>

                                    {error.title && <p className="text-red-700 text-sm font-normal">{error.producttype}</p>}
                                </div>
                            </div>
                            <div className=" col-sapn-3 sm:col-span-1">
                                <label htmlFor="title" className="block text-md font-medium leading-6 text-purple-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChangeInput}
                                        required
                                        type="text"
                                        name="title"
                                        value={addproduct.title}
                                        placeholder="Title"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.title && <p className="text-red-700 text-sm font-normal">{error.title}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="price" className="block text-md font-medium leading-6 text-purple-900">
                                    price
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.price}
                                        name="price"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.price && <p className="text-red-700 text-sm font-normal">{error.price}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="hostingfee" className="block text-md font-medium leading-6 text-purple-900">
                                    Hosting fee
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.hostingfee}
                                        name="hostingfee"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.hostingfee && <p className="text-red-700 text-sm font-normal">{error.hostingfee}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="monthlysupport" className="block text-md font-medium leading-6 text-purple-900">
                                    Monthly Support
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.monthlysupport}
                                        name="monthlysupport"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.monthlysupport && <p className="text-red-700 text-sm font-normal">{error.monthlysupport}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="installation" className="block text-md font-medium leading-6 text-purple-900">
                                Setup and Installation
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.installation}
                                        name="installation"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.installation && <p className="text-red-700 text-sm font-normal">{error.installation}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="installation" className="block text-md font-medium leading-6 text-purple-900">
                                Deposit
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.deposit}
                                        name="deposit"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.deposit && <p className="text-red-700 text-sm font-normal">{error.deposit}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="itemPrice" className="block text-md font-medium leading-6 text-purple-900">
                                    Condition
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.condition}
                                        name="condition"
                                        onChange={handleChangeInput}
                                        type="text"
                                        placeholder="Enter condition"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.condition && <p className="text-red-700 text-sm font-normal">{error.condition}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="machines" className="block text-md font-medium leading-6 text-purple-900">
                                    No of Machines
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.machines}
                                        name="machines"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.machines && <p className="text-red-700 text-sm font-normal">{error.machines}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="itemPrice" className="block text-md font-medium leading-6 text-purple-900">
                                Power
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addproduct.power}
                                        name="power"
                                        onChange={handleChangeInput}
                                        type="text"
                                        placeholder="Enter machine power"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.power && <p className="text-red-700 text-sm font-normal">{error.power}</p>}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="max-w-5xl mx-auto my-1">
                        <div className="border-l-2 border-purple-600 pl-8">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl text-purple-900 font-bold mb-2">Product image</h3>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={ async (e) =>{ 
                                       
                                        setaddproduct((prev) => ({ ...prev, image:e.target.files[0]}))
                                     
                                }}
                                    className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                />
                                {error.image && <p className="text-red-700 text-sm font-normal">{error.image}</p>}
                            </div>
                     
                        </div>
                    </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        
                        className="rounded-md mr-3 bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                        Add Product
                    </button>
                </div>
                </div>
            </form>
            <Loader loading={loading} />
        </>
    );
};

export default Addproduct;