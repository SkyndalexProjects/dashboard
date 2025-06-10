import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";

export type InitialState = {
	data: any[];
	areChannelsFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	areChannelsFetched: false,
	error: null,
};
export const fetchChannels = createAsyncThunk(
	"channels/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = `${
				import.meta.env.VITE_API_URL
			}/guilds/${guildId}/channels`;
			if (!endpoint) {
				throw new Error("CHANNELS_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(endpoint, {
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
export const channelsSlice = createSlice({
	name: "channels",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchChannels.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("channels/fetch is fulfilled");

					state.data = action.payload;
					state.areChannelsFetched = true;
				},
			)
			.addCase(
				fetchChannels.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchChannels.pending, () => {
				console.log("it is pending");
			});
	},
});

export default channelsSlice.reducer;
