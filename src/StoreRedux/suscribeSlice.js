import { createSlice } from "@reduxjs/toolkit";
export const suscribeslice = createSlice({
  name: "suscribe",
  initialState: {
    suscribes: [],
  },
  reducers: {

    Addsuscribe: (state, action) => {
      state.suscribes = action.payload;
    },
    updatesuscribes: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.suscribes.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.suscribes[index] = data;
      }
    },
    deletesuscribe: (state, action) => {
      let id = action.payload;
      const updatedsuscribes = state.suscribes.filter(function (book) {
        return book._id !== id;
      });
      state.suscribes = updatedsuscribes;
    },

  },
});

export const selectsuscribes = (state) => state.suscribe.suscribes;

export const { Addsuscribe, updatesuscribes, deletesuscribe } = suscribeslice.actions; // actions
export default suscribeslice.reducer;