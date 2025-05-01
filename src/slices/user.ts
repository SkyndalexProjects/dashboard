import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "@/thunks/user";

export type InitialState = {
	data: any[];
	isUserFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	isUserFetched: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, action) => {
				console.log("user/fetch is fulfilled");

				state.data = Array.isArray(action.payload)
					? action.payload
					: [];
				state.isUserFetched = true;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.error = action.error.message || "Unknown error";
				console.log(action.error.message);
				console.log("rejected");
			})
			.addCase(fetchUser.pending, () => {
				console.log("it is pending");
			});
	},
});

export default userSlice.reducer;
