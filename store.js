import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice'

export const store = configureStore({
    // Connect navReducer to the store
    reducer: {
        nav: navReducer,
    },
});