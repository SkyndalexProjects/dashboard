import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
	try {
		const endpoint = `${import.meta.env.VITE_API_URL}/user`;
		if (!endpoint) {
			throw new Error("USER_DATA_ENDPOINT is not defined");
		}
		const res = await fetch(endpoint, {
			credentials: "include",
		});
		const json = await res.json();

		// console.log('%c[DATA] userData are available.', 'color: #2200ff; font-weight: bold', json);

		return json;
	} catch (err) {
		console.log(err, "fetchUserThunk");
		return thunkAPI.rejectWithValue(err);
	}
});
