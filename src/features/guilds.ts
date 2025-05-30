import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";

export type InitialState = {
	data: any[];
	haveGuildsFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	haveGuildsFetched: false,
	error: null,
};
export const fetchGuilds = createAsyncThunk(
	"guilds/fetch",
	async (_, thunkAPI) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/guilds`, {
				credentials: "include",
			});
			const json = await res.json();

			console.log("fetchGuildsThunk", json);
			return json;
		} catch (err) {
			console.log(err, "fetchGuildsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);

export const guildsSlice = createSlice({
	name: "guilds",
	initialState,
	reducers: {
		setHaveGuildsFetched(state, action) {
			state.haveGuildsFetched = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchGuilds.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("guilds/fetch is fulfilled");
					state.data = Array.isArray(action.payload)
						? action.payload
						: [];
					state.haveGuildsFetched = true;
				},
			)
			.addCase(
				fetchGuilds.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchGuilds.pending, () => {
				console.log("it is pending");
			});
	},
});
export const { setHaveGuildsFetched } = guildsSlice.actions;

export default guildsSlice.reducer;
