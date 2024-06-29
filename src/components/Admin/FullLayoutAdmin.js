/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
import { serverUrl } from "../../config";
import { useDispatch,useSelector} from "react-redux";
 import { Addorder } from "../../StoreRedux/orderSlice";
import {
  Adduser, selectUsers
} from "../../StoreRedux/UserSlice";
import {Addalladmins} from "../../StoreRedux/alladminSlice"
import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";

import { Addfood } from "../../StoreRedux/foodSlice";
import { Addproduct } from "../../StoreRedux/productSlice";
import {Addsuscribe }from "../../StoreRedux/suscribeSlice";
import {Addmessage }from "../../StoreRedux/messageSlice";
export const AdminLayout = () => {
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const storeAllUsers = useSelector(selectUsers);
  // const alladmins=useSelector(selectalladmins);
  // console.log(alladmins);

  // const storeAllUsers = useSelector(selectUsers);
  //////////////////////////////fetch total users/////////////////////////////////////////////

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get(
          `${serverUrl}/api/users/get_all_users`
        );
        if (response && response.status === 200) {
          setloader(false);
          // console.log(response.data.users);
          dispatch(Adduser(response.data.users));

          toast.success("Users Fetch Successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
          toast.error("Failed to Fetch Users");
        } else {
          toast.error("Failed to Fetch Users");
          console.log("Failed to fetch Users")
        }
      }
    };

    if (storeAllUsers.length === 0) {
      fetchUsers();
    }
  }, [dispatch, storeAllUsers]);


  ///////////////////////////////////fetch all admins ///////////////////////////////

  useEffect(() => {
    const fetchAdmins = async () => {

      try {
        const response = await axios.get(
          `${serverUrl}/api/admin/get_all_admins`
        );
        if (response && response.status === 200) {
          setloader(false);
          // console.log(response.data.users);
          dispatch(Addalladmins(response.data.admins));
          console.log(response.data.admins);
        
          toast.success("Admins Fetch Successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
          toast.error("Failed to Fetch Admins");
        } else {
          toast.error("Failed to Fetch Admins");
          console.log("Failed to fetch Admins")
        }
      }
    };

   
      fetchAdmins();
        // eslint-disable-next-line
  }, []);
   /////////////////////////////fetch total foods////////////////////////////////////////////
    useEffect(() => {
      const fetchbooks = async () => {
  
        try {
          const response = await axios.get(
            `${serverUrl}/api/blog/getallblog`
          );
          if (response && response.status === 200) {
            setloader(false);
            console.log(response.data.finddata);
            dispatch(Addfood(response.data.finddata));
            toast.success("Blogs fetch successfully");
          }
        } catch (error) {
          setloader(false);
          console.log(error);
          if (error.response) {
            toast.error("Failed to Fetch blogs");
          } else {
            toast.error("Failed to Fetch blogs");
            console.log("Failed to fetch blogs")
          }
        }
      };
  
      fetchbooks();
      // eslint-disable-next-line
    }, []);
  
//// ////////  fetch products ////////////
useEffect(() => {
  const fetchProducts = async () => {

    try {
      const response = await axios.get(
        `${serverUrl}/api/product/getProducts`
      );
      if (response && response.status === 200) {
        setloader(false);
        console.log(response.data.finddata);
        dispatch(Addproduct(response.data.finddata));
        toast.success("Products fetch successfully");
      }
    } catch (error) {
      setloader(false);
      console.log(error);
      if (error.response) {
        toast.error("Failed to Fetch Products");
      } else {
        toast.error("Failed to Fetch Products");
        console.log("Failed to fetch Products")
      }
    }
  };

  fetchProducts();
  // eslint-disable-next-line
}, []);

  ///////////////////////////////fetch total orders////////////////////////////////////////////
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/order/getallorder`);
        if (response && response.status === 200) {
          setloader(false);
          dispatch(Addorder(response.data.data));
           toast.success("Orders fetched successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
           toast.error("Failed to fetch orders");
        } else {
           toast.error("Failed to fetch orders");
          console.log("Failed to fetch orders");
        }
      }
    };

    fetchOrders(); // Call fetchOrders initially

    // Set interval to call fetchOrders every 2 minutes (120000 milliseconds)
    const intervalId = setInterval(fetchOrders, 120000);

    // Clean up function to clear interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [serverUrl, dispatch]);


  
  ///////////////////////////////fetch total suscribers////////////////////////////////////////////
  useEffect(() => {
    const fetchSus = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/suscriber/getSuscribedata`);
        if (response && response.status === 200) {
          setloader(false);
          dispatch(Addsuscribe(response.data.finddata));
           toast.success("Suscribers fetched successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
           toast.error("Failed to fetch Suscribers");
        } else {
           toast.error("Failed to fetch Suscribers");
          console.log("Failed to fetch Suscribers");
        }
      }
    };

    fetchSus(); // Call fetchOrders initially
      // eslint-disable-next-line
  }, []);

  ///////////////////////////////fetch total s////////messages////////////////////////////////////
  useEffect(() => {
    const fetchSus = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/contact/getcontactdata`);
        if (response && response.status === 200) {
          setloader(false);
          dispatch(Addmessage(response.data.finddata));
           toast.success("Messages fetched successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
           toast.error("Failed to fetch Messages");
        } else {
           toast.error("Failed to fetch Messages");
          console.log("Failed to fetch Messages");
        }
      }
    };

    fetchSus(); // Call fetchOrders initially
      // eslint-disable-next-line
  }, []);
 
  return (
    <>
      <div className="antialiased bg-gray-100 dark:bg-white-600">
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
        <Loader loading={loader}></Loader>
      </div>
    </>
  );
};


