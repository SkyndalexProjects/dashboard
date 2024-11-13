import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGuilds = createAsyncThunk(
	"guilds/fetch",
	async (_, thunkAPI) => {
		try {
			const res = await fetch("http://localhost:3000/api/guilds", {
				credentials: "include",
			});
			const json = await res.json();

			console.log("fetchGuildsThunk", json);
			return json;
		} catch (err) {
			console.log(err, "fetchGuildsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);
