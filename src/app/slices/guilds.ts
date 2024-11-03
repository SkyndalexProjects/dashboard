import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGuilds } from "../thunks/guilds";

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

export const guildsSlice = createSlice({
	name: "guilds",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchGuilds.fulfilled,
				(state, action: PayloadAction<InitialState>) => {
					console.log("guilds/fetch is fulfilled");
					// @ts-ignore
					state.data = action.payload;
					state.haveGuildsFetched = true;
				},
			)
			.addCase(fetchGuilds.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				console.log(action.payload);
				console.log("rejected");
			})
			.addCase(fetchGuilds.pending, () => {
				console.log("it is pending");
			});
	},
});

export default guildsSlice.reducer;
