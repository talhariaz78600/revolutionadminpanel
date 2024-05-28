import { selectproducts } from '../../../StoreRedux/productSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../DeleteModal';
import { Loader } from '../../Loader/loader';
import {useParams} from "react-router-dom"
import { useState, useEffect } from 'react';
function Products() {
  const {producttype}=useParams();
    const allfoods = useSelector(selectproducts);
    const [delId, setdelId] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const host = useNavigate()
    const [product, setProducts]=useState()
    useEffect(() => {
   const type= allfoods.filter((item)=>item.producttype === producttype)
   setProducts(type) 
   // eslint-disable-next-line
    }, [allfoods,producttype]); 
    return (
        <div>
            <div className="flex items-center justify-start gap-2  w-full mb-5">
                {product && product !== 0 ? <span className="font-bold">{product.length}</span> : ""}
                <span className="font-bold text-2xl text-left w-full  text-purple-700">All {producttype}</span>
            </div>
         {product &&   <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {product.map((book, index) => {
                        return <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={book.imageUrl} alt="Book Cover" className="w-full h-64  object-fill" />
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
                                <div className="mt-2 flex justify-between items-center">
                                    <i className="fa-solid fa-pen-to-square text-[25px] text-purple-600 hover:cursor-pointer"
                                        onClick={() => {
                                            host(`/Admin/editproduct/${book._id}`)
                                        }}></i>
                                    <i className="fa-regular fa-trash-can text-[25px] text-red-700 hover:cursor-pointer"
                                        onClick={() => {
                                            setshowModal(true);
                                            setdelId(book._id);

                                        }}></i>
                                    <button className="px-4 py-1 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700"
                                        onClick={() => {
                                            host(`/Admin/products/${book._id}`)
                                        }}
                                    >Detail</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>}
            <DeleteModal
                setloading={setLoading}
                showModal={showModal}
                setshowModal={setshowModal}
                delId={delId}
                whatdelete="product"
            />
            <Loader loading={loading} />
        </div>
    )
}

export default Products

