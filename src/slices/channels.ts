import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChannels } from "../thunks/channels.ts";

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
