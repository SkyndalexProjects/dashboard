import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
	try {
		const endpoint = `${import.meta.env.VITE_API_URL}/user`;
		if (!endpoint) {
			throw new Error("USER_DATA_ENDPOINT is not defined");
		}
		const res = await fetch(endpoint, {
			credentials: "include",
		});
		return await res.json();
	} catch (err) {
		console.log(err, "fetchUserThunk");
		return thunkAPI.rejectWithValue(err);
	}
});

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
					console.log(
						"%c[STATE] fetchUser is fulfilled",
						"color: #4CAF50; font-weight: bold",
					);
					state.data = action.payload;
					state.isUserFetched = true;
				},
			)
			.addCase(
				fetchUser.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(
						"%c[STATE] fetchUser is rejected",
						"color: #fc0b03; font-weight: bold",
					);
				},
			)
			.addCase(fetchUser.pending, () => {
				console.log(
					"%c[STATE] fetchUser is pending",
					"color: #fcd303; font-weight: bold",
				);
			});
	},
});

export default userSlice.reducer;
