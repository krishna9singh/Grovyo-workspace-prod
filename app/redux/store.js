"use client"
import { configureStore } from "@reduxjs/toolkit";
import deleteSlice from "./slice/deleteSlice";
import editcommunity from "./slice/editcommunity";

export const store = configureStore({
	reducer: {
		editcommunity: editcommunity,
	}
})