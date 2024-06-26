// reducers/userReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const alladminslice = createSlice({
  name: "alladmin",
  initialState: {
    alladmins: [],
  },
  reducers: {

    Addalladmins: (state, action) => {
        console.log(action.payload);
      state.alladmins = action.payload;
    },
    deleteAdmin: (state, action) => {
      let id = action.payload;
      const updatedalladmins = state.alladmins.filter(function (user) {
        return user._id !== id;
      });
      state.alladmins = updatedalladmins;
    },
    AddNewAdmin: (state, action) => {
        state.alladmins = [action.payload, ...state.alladmins];
    }

  },
});

export const selectalladmins = (state) => state.alladmin.alladmins;
export const { Addalladmins,deleteAdmin,AddNewAdmin} = alladminslice.actions;
export default alladminslice.reducer;