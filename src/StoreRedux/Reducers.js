import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import adminReducer from './adminSlice';
import foodReducer from "./foodSlice"
import orderReducer from "./orderSlice"
import productReducer from "./productSlice"
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  food:foodReducer,
  order:orderReducer,
  product:productReducer,
});

export default rootReducer;