import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGuilds = createAsyncThunk(
	"guilds/fetch",
	async (_, thunkAPI) => {
		try {
			const res = await fetch("http://localhost:3000/api/guilds", {
				credentials: "include",
			});
			return await res.json();
		} catch (err) {
			console.log(err, "fetchGuildsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);