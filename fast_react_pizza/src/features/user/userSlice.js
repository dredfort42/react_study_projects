import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    updateName(state, action) {
      if (action.payload === "") return;

      state.username = action.payload;
    },
  },
});

console.log(userSlice);

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
