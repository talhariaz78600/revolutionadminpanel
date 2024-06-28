import { Navigate } from "react-router-dom";
import UserDetails from "../UserDetails";
import Error from "../Error";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import Users from "../Sidebar Pages/Users";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import Editbook from "../Sidebar Pages/foods/Editfood";
import Addproduct from "../Sidebar Pages/product/Addproduct"
import Equipmentproduct from "../Sidebar Pages/product/Products";
import Orders from "../Sidebar Pages/orders/Orders"
import Books from "../Sidebar Pages/foods/Foods";
import Addbook from "../Sidebar Pages/foods/Addfood";
import BookDetailPage from "../Sidebar Pages/foods/FoodDetailPage";
import Productdetailpage from "../Sidebar Pages/product/Productdetailpage"
import Editproduct from "../Sidebar Pages/product/Editproduct";
import OrderDetailPage from "../Sidebar Pages/orders/OrderDetailPage";
import NewAdmin from "../authPages/NewAdmin";
import SocailMedia from "../authPages/SocailMedia"
import Suscriber from "../Sidebar Pages/suscriber/Suscriber"
export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },

      // { path: "AdminDashboard/starter", exact: true, element: <PrivateRouteAdmin element={<Starter />} /> },
      { path: "starter", exact: true, element: <PrivateRouteAdmin element={<Statistics />} /> },
      { path: "userdetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetails />} /> },
      { path: "blogs", exact: true, element: <PrivateRouteAdmin element={<Books/>} /> },
      { path: "addblog", exact: true, element: <PrivateRouteAdmin element={<Addbook />} /> },
      { path: "blogs/:blogId", exact: true, element: <PrivateRouteAdmin element={<BookDetailPage />} /> },
      { path: "blogs/edit/:blogId", exact: true, element: <PrivateRouteAdmin element={<Editbook />} /> },
      { path: "product/:producttype", exact: true, element: <PrivateRouteAdmin element={<Equipmentproduct/>} /> },
      { path: "addproduct", exact: true, element: <PrivateRouteAdmin element={<Addproduct />} /> },
      { path: "products/:productId", exact: true, element: <PrivateRouteAdmin element={<Productdetailpage />} /> },
      { path: "editproduct/:productId", exact: true, element: <PrivateRouteAdmin element={<Editproduct/>} /> },
      { path: 'users', exact: true, element: <PrivateRouteAdmin element={<Users />} /> },
      { path: 'admin', exact: true, element: <PrivateRouteAdmin element={<NewAdmin />} /> },
      { path: 'media', exact: true, element: <PrivateRouteAdmin element={<SocailMedia />} /> },
      { path: 'suscriber', exact: true, element: <PrivateRouteAdmin element={<Suscriber />} /> },
      { path: 'orders/:userId', exact: true, element: <PrivateRouteAdmin element={<Orders />} /> },
      { path: 'order/:orderId', exact: true, element: <PrivateRouteAdmin element={<OrderDetailPage />} /> },
      { path: "*", exact: true, element: <Error /> },
      // { path: "starter", exact: true, element: <Statistics /> },
    ],
  },
];


