import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRoles } from "../thunks/roles.ts";

export type InitialState = {
	data: any[];
	areRolesFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	areRolesFetched: false,
	error: null,
};

export const rolesSlice = createSlice({
	name: "roles",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchRoles.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("roles/fetch is fulfilled");

					state.data = action.payload;
					state.areRolesFetched = true;
				},
			)
			.addCase(
				fetchRoles.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchRoles.pending, () => {
				console.log("it is pending");
			});
	},
});

export default rolesSlice.reducer;
