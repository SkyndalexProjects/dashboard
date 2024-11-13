import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChannels = createAsyncThunk(
	"channels/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = import.meta.env.VITE_GUILDS_CACHE_ENDPOINT;
			if (!endpoint) {
				throw new Error("CHANNELS_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(`${endpoint}/${guildId}/channels`, {
				method: "POST",
				credentials: "include",
			});

			const json = await res.json();

			console.log("fetchChannelsThunk response:", json);
			return json;
		} catch (err) {
			console.log(err, "fetchChannelsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);
