import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/user.ts";

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
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("user/fetch is fulfilled");

					state.data = action.payload;
					state.isUserFetched = true;
				},
			)
			.addCase(
				fetchUser.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchUser.pending, () => {
				console.log("it is pending");
			});
	},
});

export default userSlice.reducer;
