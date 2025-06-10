import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";

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

export const fetchCustombots = createAsyncThunk(
	"custombots/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = `${
				import.meta.env.VITE_API_URL
			}/guilds/${guildId}/custombots/get`;
			if (!endpoint) {
				throw new Error("ROLES_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(endpoint, {
				credentials: "include",
			});

			const json = await res.json();

			console.log("fetchCustombots response:", json);
			return json;
		} catch (err) {
			console.log(err, "fetchCustombotsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);

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
