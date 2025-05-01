import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChannels } from "@/thunks/channels";

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

export const channelsSlice = createSlice({
	name: "channels",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChannels.fulfilled, (state, action) => {
				console.log("channels/fetch is fulfilled");

				state.data = action.payload as any[];
				state.areChannelsFetched = true;
			})
			.addCase(fetchChannels.rejected, (state, action) => {
				state.error = action.error.message || "Unknown error";
				console.log(action.error.message);
				console.log("rejected");
			})
			.addCase(fetchChannels.pending, () => {
				console.log("it is pending");
			});
	},
});
export default channelsSlice.reducer;
