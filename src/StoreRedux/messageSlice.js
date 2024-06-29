import { createSlice } from "@reduxjs/toolkit";
export const messageslice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {

    Addmessage: (state, action) => {
      state.messages = action.payload;
    },
    updatemessages: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.messages.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.messages[index] = data;
      }
    },
    deletemessage: (state, action) => {
      let id = action.payload;
      const updatedmessages = state.messages.filter(function (book) {
        return book._id !== id;
      });
      state.messages = updatedmessages;
    },

  },
});

export const selectmessages = (state) => state.message.messages;

export const { Addmessage, updatemessages, deletemessage } = messageslice.actions; // actions
export default messageslice.reducer;