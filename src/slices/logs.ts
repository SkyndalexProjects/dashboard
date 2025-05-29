import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchLogs } from "@/thunks/logs";

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
