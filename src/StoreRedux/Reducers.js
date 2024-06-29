import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import adminReducer from './adminSlice';
import foodReducer from "./foodSlice"
import orderReducer from "./orderSlice"
import productReducer from "./productSlice"
import adminsReducer from "./alladminSlice"
import suscribeReducer from "./suscribeSlice"
import messageReducer from "./messageSlice"
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  food:foodReducer,
  order:orderReducer,
  product:productReducer,
  alladmin:adminsReducer,
  suscribe:suscribeReducer,
  message:messageReducer 
});

export default rootReducer;