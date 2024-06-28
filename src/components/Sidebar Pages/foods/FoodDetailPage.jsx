import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectfoods } from '../../../StoreRedux/foodSlice';
import { useSelector } from 'react-redux';
function BookDetailPage() {
    const bookdata = useSelector(selectfoods)
    const { blogId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const datadetail = bookdata.find(data => data._id === blogId)
        console.log(datadetail)
        setBook(datadetail);
        // eslint-disable-next-line
    }, [bookdata]);

    return (
        <div className="container mx-auto md:px-4">
            {book ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <img className='w-full h-[300px]' src={book.imageUrl} alt="fooditem" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold text-purple-800 ">{book.title}</h3>
                        <small>{new Intl.DateTimeFormat("en", {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        }).format(new Date(book.data))}</small>
                        <div className='mt-4 content' style={{ lineHeight: "2.5" }} dangerouslySetInnerHTML={{ __html: book.description }}></div>
                        {/* <p className="text-sm text-gray-600 my-2"><span className=' text-purple-600 font-bold mr-2'>Ingredients: </span>{book.Ingredients}</p> */}
                    </div>


                    <div className="max-w-2xl mx-auto my-8">
                        <h2 className="text-2xl font-bold mb-6 text-purple-800">Comments</h2>
                        {book.comments.map(comment => (
                            <div key={comment.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                                <div className="flex items-center mb-4">
   
                                    <div className="ml-4">
                                        <h5 className="text-lg font-semibold">{comment.name}</h5>
                                        <p className="text-sm text-gray-500">{comment.email}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                <p className='text-center m-5 text-xl'>Loading...</p>
            )}
        </div>
    );
}

export default BookDetailPage;
