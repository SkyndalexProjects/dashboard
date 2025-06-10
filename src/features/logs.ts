import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";

export type InitialState = {
	data: any[];
	areLogsFetched: boolean;
	error: string | null;
};

export const initialState: InitialState = {
	data: [],
	areLogsFetched: false,
	error: null,
};
export const fetchLogs = createAsyncThunk(
	"logs/fetch",
	async (guildId: string, thunkAPI) => {
		try {
			const endpoint = `${import.meta.env.VITE_API_URL}/guilds/${guildId}/logs`;
			if (!endpoint) {
				throw new Error("LOGS_DATA_ENDPOINT is not defined");
			}

			const res = await fetch(endpoint, {
				credentials: "include",
			});

			const json = await res.json();

			console.log("fetchLogs response:", json);
			return json;
		} catch (err) {
			console.log(err, "fetchLogsThunk");
			return thunkAPI.rejectWithValue(err);
		}
	},
);

export const logsSlice = createSlice({
	name: "logs",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchLogs.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					console.log("logs/fetch is fulfilled");

					state.data = action.payload;
					state.areLogsFetched = true;
				},
			)
			.addCase(
				fetchLogs.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					console.log(action.payload);
					console.log("rejected");
				},
			)
			.addCase(fetchLogs.pending, () => {
				console.log("it is pending");
			});
	},
});

export default logsSlice.reducer;
