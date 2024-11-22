import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustombots = createAsyncThunk(
	"custombots/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = `${import.meta.env.VITE_API_URL}/guilds/${guildId}/custombots`;
			if (!endpoint) {
				throw new Error("ROLES_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(endpoint, {
				method: "POST",
				credentials: "include",
			});

			const json = await res.json();

			console.log("fetchCustombots response:", json);
			return json;
		} catch (err) {
			console.log(err, "fetchCustombotsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);
