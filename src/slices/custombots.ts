import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCustombots } from "../thunks/custombots.ts";

export type InitialState = {
	data: any[];
	areCustombotsFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	areCustombotsFetched: false,
	error: null,
};

export const custombotsSlice = createSlice({
	name: "custombots",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCustombots.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("custombots/fetch is fulfilled");

					state.data = action.payload;
					state.areCustombotsFetched = true;
				},
			)
			.addCase(
				fetchCustombots.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchCustombots.pending, () => {
				console.log("it is pending");
			});
	},
});

export default custombotsSlice.reducer;
