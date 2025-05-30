import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";
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
export const fetchRoles = createAsyncThunk(
	"roles/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = `${
				import.meta.env.VITE_API_URL
			}/guilds/${guildId}/roles`;
			if (!endpoint) {
				throw new Error("ROLES_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(endpoint, {
				method: "POST",
				credentials: "include",
			});

			const json = await res.json();

			console.log("fetchRolesThunk response:", json);
			return json;
		} catch (err) {
			console.log(err, "fetchChannelsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);

export const rolesSlice = createSlice({
	name: "roles",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchRoles.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					// console.log("roles/fetch is fulfilled");

					console.log("[STATE] fetchRoles is fulfilled");
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
