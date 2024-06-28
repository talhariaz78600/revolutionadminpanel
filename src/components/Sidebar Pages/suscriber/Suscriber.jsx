import React from 'react';
import { useSelector } from 'react-redux';
import { selectsuscribes } from '../../../StoreRedux/suscribeSlice'; 

const SubscribersList = () => {
  const subscribers = useSelector(selectsuscribes);
  console.log(subscribers)

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Subscribers</h2>
    {subscribers&&<div className="bg-white shadow-md rounded-lg p-6">
        <ul>
          {subscribers.map(subscriber => (
            <li key={subscriber.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <span className="text-gray-700">{subscriber.email}</span>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default SubscribersList;

