import { configureStore } from "@reduxjs/toolkit";

import clockReducer from "./lib/slices/clockSlice";
import counterReducer from "./lib/slices/counterSlice";
import notesReducer from "./lib/slices/notesSlice";
import textReducer from "./lib/slices/textSlice";
import moviesReducer from "./lib/slices/moviesSlice";
import watchReducer from "./lib/slices/watchSlice";
import modalReducer from "./lib/slices/modalSlice";
import userReducer from "./lib/slices/userSlice";
import inputReducer from "./lib/slices/inputSlice";
import roleReducer from "./lib/slices/roleSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    clock: clockReducer,
    notes: notesReducer,
    text: textReducer,
    movies: moviesReducer,
    watch: watchReducer,
    modal: modalReducer,
    user: userReducer,
    input: inputReducer,
    role: roleReducer,
  },
  devTools: true,
});
