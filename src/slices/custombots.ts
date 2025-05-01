import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCustombots } from "@/thunks/custombots";

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
			.addCase(fetchCustombots.fulfilled, (state, action) => {
				console.log("custombots/fetch is fulfilled");

				state.data = action.payload as any[];
				state.areCustombotsFetched = true;
			})
			.addCase(fetchCustombots.rejected, (state, action) => {
				state.error = action.error.message || "Unknown error";
				console.log(action.error.message);
				console.log("rejected");
			})
			.addCase(fetchCustombots.pending, () => {
				console.log("it is pending");
			});
	},
});

export default custombotsSlice.reducer;
